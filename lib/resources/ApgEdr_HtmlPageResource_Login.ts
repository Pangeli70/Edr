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
    Drash, Uts
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
    ApgEdr_Service
} from "../services/ApgEdr_Service.ts";




export class ApgEdr_HtmlPageResource_Login extends Drash.Resource {

    readonly BODY_PARAM_EMAIL = "email";
    readonly BODY_PARAM_OTP = "otp";

    override paths = [ApgEdr_Route_eShared.PAGE_LOGIN];


    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdrRequest(request);

        const rawEmail = request.queryParam(this.BODY_PARAM_EMAIL) as string;

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


    async POST(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdrRequest(request);

        const rawEmail = await request.bodyParam(this.BODY_PARAM_EMAIL) as string;

        const rawOtp = await request.bodyParam(this.BODY_PARAM_OTP) as string;
        const otp = parseInt(rawOtp);

        const currentDateTime = Date.now();


        let r = ApgEdr_Auth_Service.VerifyOtp(rawEmail, otp, currentDateTime);


        let errorMessage = "";
        if (!r.ok) {
            errorMessage = "Error while verifying OTP for [" + rawEmail + "] " + r.message;
        }
        else {
            const sessionId = ApgEdr_Service.GetSessionId(edr);

            r = await ApgEdr_Auth_Service.GetJwtCookie(rawEmail, sessionId);

            if (!r.ok) {
                errorMessage = "Error while generating JWT cookie for [" + rawEmail + "]  " + r.message;
            } else {
                response.setCookie(r.payload!.data as Uts.Std.Cookie);
            }
        }


        if (errorMessage !== "") {
            this.#errorDuringLogin(response, edr, rawEmail, errorMessage);
            return;
        }
        else {
            this.redirect(ApgEdr_Route_eShared.PAGE_HOME, response);
        }
    }



    #errorDuringLogin(
        response: Drash.Response,
        edr: ApgEdr_IRequest,
        rawEmail: string,
        errorMessage: string,
    ) {

        // Delete the cookie anyways
        response.headers.delete('Set-Cookie');
        const cookie = ApgEdr_Auth_Service.DeleteJwtCookie();
        response.setCookie(cookie);

        const backPage = ApgEdr_Route_eShared.PAGE_LOGIN + "?" + this.BODY_PARAM_EMAIL + "=" + rawEmail;

        // Log the error
        ApgEdr_Service.Error(
            import.meta.url,
            this.POST,
            edr,
            errorMessage,
            backPage
        );

        // Redirect to the error page
        const errorPage = ApgEdr_Route_eShared.PAGE_ERROR + "/" + edr.counter.toString();
        this.redirect(errorPage, response);
    }
}
