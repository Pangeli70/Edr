/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/09] Alpha version
 * @version 0.9.2 [APG 2023/04/16] Moved to its own microservice
 * @version 0.9.3 [APG 2024/01/06] Revamped
 * @version 1.0.0 [APG 2024/07/01] Cleanup
 * @version 1.0.1 [APG 2024/07/31] ApgEdr_Service.GetTemplateData
 * @version 1.0.2 [APG 2024/08/13] Moved to lib
 * @version 1.0.2 [APG 2024/10/15] Translations
 * @version 1.0.3 [APG 2024/11/07] Better error management
 * @version 1.0.4 [APG 2024/12/24] Moving to Deno V2
----------------------------------------------------------------------------
 */

import { ApgEdr_Request } from "../../classes/ApgEdr_Request.ts";
import { Drash, Uts } from "../../deps.ts";
import { ApgEdr_eRoute } from "../../enums/ApgEdr_eRoute.ts";
import { ApgEdr_Service_Auth } from "../../services/ApgEdr_Service_Auth.ts";
import { ApgEdr_Service_ResendMail } from "../../services/ApgEdr_Service_ResendMail.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_TngResource_Base } from "../ApgEdr_TngResource_Base.ts";
import { Tng } from "../../monorepo.ts";



enum _eTranslation {

    GET_PageTitle = "GET_PageTitle",
    GET_P1 = "GET_P1",
    GET_SUBMIT = "GET_Submit",

    POST_PageTitle = "POST_PageTitle",
    POST_P1 = "POST_P1",
    POST_P2 = "POST_P2",
    POST_P3 = "POST_P3",
    POST_P4 = "POST_P4",
    POST_P5 = "POST_P5",
    POST_BUTTON_NEW_OTP = "POST_Button_NewOtp",
    POST_BUTTON_SUPPORT = "POST_Button_Support",
    POST_Error_EmailNotFound = "POST_error_EmailNotFound",
    POST_Error_MailServer = "POST_error_MailServer",
    EMAIL_Subject = "EMAIL_Subject",
    EMAIL_Content = "EMAIL_Content"
}



const _Translator = new Uts.ApgUts_Translator(
    {
        [_eTranslation.GET_PageTitle]: {
            IT: "Richiedi OTP",
            EN: "Request OTP"
        },
        [_eTranslation.GET_P1]: {
            IT: "Richiedi via E-Mail una password a singolo uso (OTP)",
            EN: "Request via E-mail a One Time Password (OTP)"
        },
        [_eTranslation.GET_SUBMIT]: {
            IT: "Richiedi",
            EN: "Request"
        },

        [_eTranslation.POST_PageTitle]: {
            IT: "Inserire OTP",
            EN: "Submit OTP"
        },
        [_eTranslation.POST_P1]: {
            IT: "Gentile [[%1]] per favore controlla la tua casella  email",
            EN: "Dear [[%1]] please check your email box"
        },
        [_eTranslation.POST_P2]: {
            IT: "Utilizza la OTP ricevuta per accedere",
            EN: "Use the received One Time Password to log in"
        },
        [_eTranslation.POST_P3]: {
            IT: "<strong>Attenzione!</strong> La OTP scadrà entro [[%1]] minuti",
            EN: "<strong>Warning!</strong> The OTP will expire within [[%1]] minutes."
        },
        [_eTranslation.POST_P4]: {
            IT: "Se non l'hai ricevuta controlla l'indirizzo email inserito o la cartella dello spam oppure ...",
            EN: "If you haven't received it please check the submitted email address, check your spam folder or ..."
        },
        [_eTranslation.POST_P5]: {
            IT: "Se continui ad avere problemi per ottenere la OTP ...",
            EN: "If you still have problems getting the OTP ..."
        },
        [_eTranslation.POST_BUTTON_NEW_OTP]: {
            IT: "Richiedi nuova OTP",
            EN: "Request new OTP"
        },
        [_eTranslation.POST_BUTTON_SUPPORT]: {
            IT: "Richiedi assistenza",
            EN: "Request support"
        },
        [_eTranslation.POST_Error_EmailNotFound]: {
            IT: "Email [[%1]] non trovata. L'utente è sconosciuto. Per favore contattare l'assistenza.",
            EN: "Email [[%1]] not found. The user is unknown. Please contact support."
        },
        [_eTranslation.POST_Error_MailServer]: {
            IT: "Il messaggio email con la OTP non è stato inviato a [%1]. Il server di posta elettronica non risponde.",
            EN: "Email message with OTP was not delivered to [%1]. The mail server is not responding."
        },
        [_eTranslation.EMAIL_Subject]: {
            IT: "Password a singolo uso (OTP)",
            EN: "One time password (OTP)"
        },
        [_eTranslation.EMAIL_Content]: {
            IT: "La tua nuova OTP è [[%1]]. Rimarrà valida per [[%2]] minuti.",
            EN: "Your new OTP is [[%1]]. It will remain valid for [[%2]] minutes."
        }

    }
);



export class ApgEdr_TngResource_RequestOtp

    extends ApgEdr_TngResource_Base {


    override readonly RESOURCE_NAME = ApgEdr_TngResource_RequestOtp.name;
    override readonly TITLE = "Request OTP";
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/public/" + this.RESOURCE_NAME + ".html",
        POST: "/pages/public/" + this.RESOURCE_NAME + "_POST.html"
    };

    readonly BODY_PARAM_EMAIL = "email";
    readonly QS_PARAM_EMAIL = "email";

    override paths = [ApgEdr_eRoute.PAGE_REQ_OTP];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        const pageTitle = _Translator.get(_eTranslation.GET_PageTitle, edr.language);

        const rawEmail = request.queryParam(this.QS_PARAM_EMAIL);

        let templateData: Tng.ApgTng_IPageData;

        if (rawEmail !== undefined) {
            const email = rawEmail.trim().toLowerCase();
            templateData = this.#getTemplateDataForPost(edr, pageTitle, email);
        }
        else {
            templateData = this.#getTemplateDataForGet(edr, pageTitle);
        }

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }



    #getTemplateDataForGet(
        edr: ApgEdr_Request,
        pageTitle: string
    ) {

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            pageTitle,
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        );

        templateData.page.data = {
            action: ApgEdr_eRoute.PAGE_REQ_OTP
        };
        templateData.page.translations = {
            [_eTranslation.GET_P1]: _Translator.get(_eTranslation.GET_P1, edr.language),
            [_eTranslation.GET_SUBMIT]: _Translator.get(_eTranslation.GET_SUBMIT, edr.language),
        };
        return templateData;
    }


    
    async POST(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        const pageTitle = _Translator.get(_eTranslation.POST_PageTitle, edr.language);

        const rawEmail = await request.bodyParam(this.BODY_PARAM_EMAIL) as string;
        const auth = ApgEdr_Service_Auth.Authentications[rawEmail];

        if (!auth) {
            const errorMessage = _Translator.get(_eTranslation.POST_Error_EmailNotFound, edr.language, [rawEmail]);
            this.#handlePostError(edr, this.POST.name, request, response, errorMessage);
            return;
        }

        const newOtp = ApgEdr_Service_Auth.GenerateOTP();

        // TODO move this address to configurable variable -- APG 20241201
        const sender = ApgEdr_Service_Core.Microservice.name + " <login@apg-web-dev-24.it>";
        const subject = ApgEdr_Service_Core.Microservice.name + " " + _Translator.get(
            _eTranslation.EMAIL_Subject,
            edr.language
        );
        const content = _Translator.get(
            _eTranslation.EMAIL_Content,
            edr.language,
            [newOtp.toString(), ApgEdr_Service_Auth.OTP_VALIDITY_MINUTES.toString()]
        );

        const r = await ApgEdr_Service_ResendMail.SendEmail(
            sender,
            [rawEmail],
            subject,
            content,
        )

        if (!r.ok) {
            const errorMessage = _Translator.get(
                _eTranslation.POST_Error_MailServer,
                edr.language,
                [rawEmail, ...r.messages]
            );
            this.#handlePostError(edr, this.POST.name, request, response, errorMessage);
            return;
        }

        const newOtpDateTime = Date.now();
        const r2 = ApgEdr_Service_Auth.SetNewOtpForUser(rawEmail, newOtp, newOtpDateTime, edr.language);

        const templateData = this.#getTemplateDataForPost(edr, pageTitle, rawEmail);

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events)
        response.html(html);
    }



    #getTemplateDataForPost(edr: ApgEdr_Request, pageTitle: string, rawEmail: string) {

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            pageTitle,
            this.TNG_TEMPLATES.POST,
            this.ARE_TEMPLATES_FROM_CDN
        );

        templateData.page.data = {
            email: rawEmail,
            action: ApgEdr_eRoute.PAGE_LOGIN,
            requestNewOtpLink: ApgEdr_eRoute.PAGE_REQ_OTP,
            requestSupportLink: ApgEdr_eRoute.PAGE_REQ_SUPPORT
        };

        templateData.page.translations = {
            [_eTranslation.POST_P1]: _Translator.get(_eTranslation.POST_P1, edr.language, [rawEmail]),
            [_eTranslation.POST_P2]: _Translator.get(_eTranslation.POST_P2, edr.language),
            [_eTranslation.POST_P3]: _Translator.get(_eTranslation.POST_P3, edr.language, [ApgEdr_Service_Auth.OTP_VALIDITY_MINUTES.toString()]),
            [_eTranslation.POST_P4]: _Translator.get(_eTranslation.POST_P4, edr.language),
            [_eTranslation.POST_P5]: _Translator.get(_eTranslation.POST_P5, edr.language),
            [_eTranslation.POST_BUTTON_NEW_OTP]: _Translator.get(_eTranslation.POST_BUTTON_NEW_OTP, edr.language),
            [_eTranslation.POST_BUTTON_SUPPORT]: _Translator.get(_eTranslation.POST_BUTTON_SUPPORT, edr.language),
        };
        return templateData;
    }



    #handlePostError(
        aedr: ApgEdr_Request,
        amethodName: string,
        arequest: Drash.Request,
        aresponse: Drash.Response,
        aerrorMessage: string
    ) {

        aedr.message = {
            title: "Error",
            text: aerrorMessage,
            next: ApgEdr_eRoute.PAGE_REQ_OTP
        };


        // Log the error
        ApgEdr_Service_Core.HandleError(
            aedr,
            this.RESOURCE_NAME,
            amethodName,
        );


        this.logAndRedirectToErrorPage(aedr, amethodName, aresponse, arequest.url);

    }
}


