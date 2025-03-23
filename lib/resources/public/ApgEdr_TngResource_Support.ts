/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/11/15]
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { ApgEdr_Request } from "../../classes/ApgEdr_Request.ts";
import { Drash, Uts } from "../../deps.ts";
import { ApgEdr_eRoute } from "../../enums/ApgEdr_eRoute.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Service_ResendMail } from "../../services/ApgEdr_Service_ResendMail.ts";
import { ApgEdr_TngResource_Base } from "../ApgEdr_TngResource_Base.ts";
import { ApgEdr_TngResource_Message_Base } from "../ApgEdr_TngResource_Message_Base.ts";



enum _eTranslations {

    PAGE_TITLE = "PAGE_TITLE_GET_1",

    GET_Email_Label = "GET_Email_Label",
    GET_Message_Label = "GET_Message_Label",
    GET_Ok_Button = "GET_Ok_Button",
    GET_Cancel_Button = "GET_Cancel_Button",

    POST_Email_Sender = "POST_Email_Sender",
    POST_Email_Subject = "POST_Email_Subject",
    POST_Email_Content = "POST_Email_Content",
    POST_Success_Message = "POST_Success_Message",
    POST_Error_MailServer = "POST_Error_MailServer",
    POST_Error_MailAddress = "POST_Error_MailAddress"

}



const _Translator = new Uts.ApgUts_Translator(
    {
        [_eTranslations.PAGE_TITLE]: {
            EN: "Support request",
            IT: "Richiesta di supporto"
        },
        [_eTranslations.GET_Email_Label]: {
            EN: "Email address to receive the answer",
            IT: "Indirizzo email per ricevere la risposta",
        },
        [_eTranslations.GET_Message_Label]: {
            EN: "Message's text",
            IT: "Testo del messaggio"
        },
        [_eTranslations.GET_Ok_Button]: {
            EN: "Send message",
            IT: "Invia messaggio"
        },
        [_eTranslations.GET_Cancel_Button]: {
            EN: "Cancel",
            IT: "Annulla"
        },
        [_eTranslations.POST_Email_Subject]: {
            EN: "Support request",
            IT: "Richiesta di supporto"
        },
        [_eTranslations.POST_Email_Sender]: {
            EN: "The [%1] support team <[%2]>",
            IT: "Il team di supporto di [%1] <[%2]>"
        },
        [_eTranslations.POST_Email_Content]: {
            EN: "<p>Dear [%1],</p> <p>You have sent the following message to our support team:</p> <p><i>[%2]</i></p> <p>We will reply to you as soon as possible.</p>",
            IT: "<p>Gentile [%1],</p> <p>Hai inviato il seguente messaggio al nostro team di supporto:</p> <p><i>[%2]</i></p> <p>Vi risponderemo il prima possibile.</p>"
        },
        [_eTranslations.POST_Success_Message]: {
            EN: "Your message has been sent successfully to the support team. We will reply to you as soon as possible.",
            IT: "Il tuo messaggio è stato inviato con successo al team di supporto. Ti risponderemo il prima possibile."
        },
        [_eTranslations.POST_Error_MailServer]: {
            IT: "Il messaggio email con la richiesta di supporto non è stato inviato. Il server di posta elettronica non risponde. Riprovare più tardi",
            EN: "Email message with with support request was not delivered. The mail server is not responding. Retry later."
        },
        [_eTranslations.POST_Error_MailAddress]: {
            IT: "L'indirizzo email inserito non è valido.",
            EN: "The inserted email address is not valid."
        },
    }
)



export class ApgEdr_TngResource_Support

    extends ApgEdr_TngResource_Base {


    override readonly RESOURCE_NAME = ApgEdr_TngResource_Support.name;
    override readonly TITLE = "Support request";
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/public/" + this.RESOURCE_NAME + ".html",
        POST: "/pages/public/" + ApgEdr_TngResource_Message_Base.name + ".html"
    };

    readonly BODY_PARAM_EMAIL = "email";
    readonly BODY_PARAM_MESSAGE = "message";

    override paths = [ApgEdr_eRoute.PAGE_REQ_SUPPORT];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        
        const templateData = ApgEdr_Service_Core.GetTngData(edr, this, 'GET');
        
        const pageTitle = _Translator.get(_eTranslations.PAGE_TITLE, edr.language);
        templateData.page.title = pageTitle;


        templateData.page.data = {
            action: ApgEdr_eRoute.PAGE_REQ_SUPPORT
        }

        templateData.page.translations = _Translator.getAll(edr.language);

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }



    async POST(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);


        const rawEmail = await request.bodyParam(this.BODY_PARAM_EMAIL) as string;
        const emailOk = Uts.ApgUts_Is.IsEmailAddress(rawEmail);
        if (!emailOk) {
            return this.#handleInvalidEmailError(edr, this.POST.name, request, response);
        }


        const rawMessage = await request.bodyParam(this.BODY_PARAM_MESSAGE) as string;
        const message = rawMessage.replace(/\r?\n/g, "<br />");

        const arecipients = [rawEmail];
        const sender = _Translator.get(
            _eTranslations.POST_Email_Sender,
            edr.language,
            [ApgEdr_Service_Core.Microservice.name, ApgEdr_Service_ResendMail.sender]
        );
        const accns = [ApgEdr_Service_Core.SupportEmail]

        const ahtml = _Translator.get(
            _eTranslations.POST_Email_Content,
            edr.language, [rawEmail, message])

        // TODO Send email to customer and to support team in ccn address
        const r = await ApgEdr_Service_ResendMail.SendEmail(
            sender,
            arecipients,
            _Translator.get(_eTranslations.POST_Email_Subject, edr.language),
            ahtml,
            accns
        );

        if (!r.ok) {
            return this.#handleEmailDeliveryError(edr, this.POST.name, request, response);
        }


        const templateData = ApgEdr_Service_Core.GetTngData(edr, this, 'POST');
        const pageTitle = _Translator.get(_eTranslations.PAGE_TITLE, edr.language);
        templateData.page.title = pageTitle;

        templateData.page.data = {
            okLink: ApgEdr_eRoute.PAGE_MENU_USER,
            message: _Translator.get(_eTranslations.POST_Success_Message, edr.language),
        }


        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }




    #handleInvalidEmailError(
        aedr: ApgEdr_Request,
        amethodName: string,
        arequest: Drash.Request,
        aresponse: Drash.Response
    ) {

        aedr.message = {
            title: "Error",
            text: _Translator.get(_eTranslations.POST_Error_MailAddress, aedr.language),
            next: ApgEdr_eRoute.PAGE_REQ_SUPPORT
        };
        // Log the error
        ApgEdr_Service_Core.HandleError(
            aedr,
            this.RESOURCE_NAME,
            amethodName,
        );

        this.logAndRedirectToErrorPage(aedr, amethodName, aresponse, arequest.url);

    }



    #handleEmailDeliveryError(
        aedr: ApgEdr_Request,
        amethodName: string,
        arequest: Drash.Request,
        aresponse: Drash.Response,

    ) {

        aedr.message = {
            title: "Error",
            text: _Translator.get(_eTranslations.POST_Error_MailServer, aedr.language),
            next: ApgEdr_eRoute.PAGE_HOME
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




