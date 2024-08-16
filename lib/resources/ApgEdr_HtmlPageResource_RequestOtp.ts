/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240701 Cleanup
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * ----------------------------------------------------------------------------
 */

import {
    Drash
} from "../deps.ts";
import {
    ApgEdr_Route_eShared
} from "../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_IRequest
} from "../interfaces/ApgEdr_IRequest.ts";
import {
    ApgEdr_Auth_Service
} from "../services/ApgEdr_Auth_Service.ts";
import {
    ApgEdr_ResendMail_Service
} from "../services/ApgEdr_Mail_Service.ts";
import {
    ApgEdr_Service
} from "../services/ApgEdr_Service.ts";




export class ApgEdr_HtmlPageResource_RequestOtp extends Drash.Resource {

    readonly BODY_PARAM_EMAIL = "email";

    override paths = [ApgEdr_Route_eShared.PAGE_REQ_OTP];


    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdrRequest(request);

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Login',
            "/pages/ApgEdr_HtmlPageTemplate_RequestOtp_01.html"
        )

        templateData.page.data = {
            action: ApgEdr_Route_eShared.PAGE_REQ_OTP
        }

        await ApgEdr_Service.RenderPageUsingTng(
            request,
            response,
            templateData,
            {
                isCdnTemplate: true
            }
        );
    }



    async POST(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdrRequest(request);

        const rawEmail = await request.bodyParam(this.BODY_PARAM_EMAIL) as string;
        const auth = ApgEdr_Auth_Service.Authentications[rawEmail];

        if (!auth) {
            const errorMessage = "Email not found [" + rawEmail + "] the user is unknown. Please contact support.";
            this.#errorDuringLogin(response, edr, errorMessage);
            return;
        }

        const newOtp = ApgEdr_Auth_Service.GenerateOTP();
        const newOtpDateTime = Date.now();
        const res = await ApgEdr_ResendMail_Service.SendEmail(
            "ApgEdr <login@apg-web-dev-24.it>",
            [rawEmail],
            "ApgEdr OTP",
            "Your OTP is: " + newOtp,
        )

        if (res.ok) {
            ApgEdr_Auth_Service.SetNewOtpForUser(rawEmail, newOtp, newOtpDateTime);
        }
        else {
            const errorMessage = "Email message with OTP was not delivered to [" + rawEmail + "]. The mail server might be down.";
            this.#errorDuringLogin(response, edr, errorMessage);
            return;
        }

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Submit otp',
            "/pages/ApgEdr_HtmlPageTemplate_Login_01.html"
        )

        templateData.page.data = {
            email: rawEmail,
            action: ApgEdr_Route_eShared.PAGE_LOGIN,
            requestNewOtpLink: ApgEdr_Route_eShared.PAGE_REQ_OTP
        }


        await ApgEdr_Service.RenderPageUsingTng(
            request,
            response,
            templateData,
            {
                isCdnTemplate: true
            }
        );
    }



    #errorDuringLogin(
        response: Drash.Response,
        edr: ApgEdr_IRequest,
        aerrorMessage: string
    ) {

        const backPage = ApgEdr_Route_eShared.PAGE_REQ_OTP;

        // Log the error
        ApgEdr_Service.Error(
            import.meta.url,
            this.POST,
            edr,
            aerrorMessage,
            backPage
        );

        // Redirect to the error page
        const errorPage = ApgEdr_Route_eShared.PAGE_ERROR + "/" + edr.counter.toString();
        this.redirect(errorPage, response);
    }
}


