/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240701 Cleanup
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * @version 1.2 APG 20241015 Translations
 * @version 1.3 APG 20241107 Better error management
----------------------------------------------------------------------------
 */

import {
    ApgEdr_Request
} from "../../classes/ApgEdr_Request.ts";
import {
    Drash,
    Uts
} from "../../deps.ts";
import {
    ApgEdr_Route_eShared
} from "../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_Auth_Service
} from "../../services/ApgEdr_Auth_Service.ts";
import {
    ApgEdr_ResendMail_Service
} from "../../services/ApgEdr_Mail_Service.ts";
import {
    ApgEdr_Service
} from "../../services/ApgEdr_Service.ts";
import {
    ApgEdr_HtmlPageResource
} from "./ApgEdr_HtmlPageResource.ts";



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
            IT: "Email [[%1]] non trovata. L'utente non esiste. Per favore contattare l'assistenza.",
            EN: "Email [[%1]] not found the user is unknown. Please contact support."
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



export class ApgEdr_HtmlPageResource_RequestOtp

    extends ApgEdr_HtmlPageResource {


    override readonly RESOURCE_NAME = ApgEdr_HtmlPageResource_RequestOtp.name;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/ApgEdr_HtmlPageTemplate_RequestOtp_GET_01.html",
        POST: "/pages/ApgEdr_HtmlPageTemplate_RequestOtp_POST_01.html",
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly BODY_PARAM_EMAIL = "email";

    override paths = [ApgEdr_Route_eShared.PAGE_REQ_OTP];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            _Translator.get(_eTranslation.GET_PageTitle, edr.language),
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        templateData.page.data = {
            translations: {
                [_eTranslation.GET_P1]: _Translator.get(_eTranslation.GET_P1, edr.language),
                [_eTranslation.GET_SUBMIT]: _Translator.get(_eTranslation.GET_SUBMIT, edr.language),
            },
            action: ApgEdr_Route_eShared.PAGE_REQ_OTP
        }

        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }



    async POST(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);

        const rawEmail = await request.bodyParam(this.BODY_PARAM_EMAIL) as string;
        const auth = ApgEdr_Auth_Service.Authentications[rawEmail];

        if (!auth) {
            const errorMessage = _Translator.get(_eTranslation.POST_Error_EmailNotFound, edr.language);
            this.#handleEmailDeliveryError(edr, this.POST.name, request, response, errorMessage);
            return;
        }

        const newOtp = ApgEdr_Auth_Service.GenerateOTP();

        // TODO move this address to configurable variable -- APG 20241201
        const sender = ApgEdr_Service.Microservice.name + " <login@apg-web-dev-24.it>";
        const subject = ApgEdr_Service.Microservice.name + " " + _Translator.get(
            _eTranslation.EMAIL_Subject,
            edr.language
        );
        const content = _Translator.get(
            _eTranslation.EMAIL_Content,
            edr.language,
            [newOtp.toString(), ApgEdr_Auth_Service.OTP_VALIDITY_MINUTES.toString()]
        );

        const r = await ApgEdr_ResendMail_Service.SendEmail(
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
            this.#handleEmailDeliveryError(edr, this.POST.name, request, response, errorMessage);
            return;
        }

        const newOtpDateTime = Date.now();
        ApgEdr_Auth_Service.SetNewOtpForUser(rawEmail, newOtp, newOtpDateTime);

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            _Translator.get(_eTranslation.POST_PageTitle, edr.language),
            this.TNG_TEMPLATES.POST,
            this.ARE_TEMPLATES_FROM_CDN
        )

        templateData.page.data = {
            email: rawEmail,
            translations: {
                [_eTranslation.POST_P1]: _Translator.get(_eTranslation.POST_P1, edr.language, [rawEmail]),
                [_eTranslation.POST_P2]: _Translator.get(_eTranslation.POST_P2, edr.language),
                [_eTranslation.POST_P3]: _Translator.get(_eTranslation.POST_P3, edr.language, [ApgEdr_Auth_Service.OTP_VALIDITY_MINUTES.toString()]),
                [_eTranslation.POST_P4]: _Translator.get(_eTranslation.POST_P4, edr.language),
                [_eTranslation.POST_P5]: _Translator.get(_eTranslation.POST_P5, edr.language),
                [_eTranslation.POST_BUTTON_NEW_OTP]: _Translator.get(_eTranslation.POST_BUTTON_NEW_OTP, edr.language),
                [_eTranslation.POST_BUTTON_SUPPORT]: _Translator.get(_eTranslation.POST_BUTTON_SUPPORT, edr.language),
            },
            action: ApgEdr_Route_eShared.PAGE_LOGIN,
            requestNewOtpLink: ApgEdr_Route_eShared.PAGE_REQ_OTP,
            requestSupportLink: ApgEdr_Route_eShared.PAGE_REQ_SUPPORT
        }


        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events)
        response.html(html);
    }



    #handleEmailDeliveryError(
        aedr: ApgEdr_Request,
        amethodName: string,
        arequest: Drash.Request,
        aresponse: Drash.Response,
        aerrorMessage: string
    ) {

        aedr.message = {
            title: "Error",
            text: aerrorMessage,
            next: ApgEdr_Route_eShared.PAGE_REQ_OTP
        };


        // Log the error
        ApgEdr_Service.HandleError(
            aedr,
            this.RESOURCE_NAME,
            amethodName,
        );


        this.logAndRedirectToErrorPage(aedr, amethodName, aresponse, arequest.url);

    }
}


