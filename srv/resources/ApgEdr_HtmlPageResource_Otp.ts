/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240701 Cleanup and alignment to ApgCdn
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * ----------------------------------------------------------------------------
 */

import {
    Edr, Uts
} from "../deps.ts";
import {
    ApgEdr_eRoutes
} from "../enums/ApgEdr_eRoute.ts";




export class ApgEdr_HtmlPageResource_Otp extends Edr.Drash.Resource {

    readonly BODY_PARAM_EMAIL = "email";
    readonly BODY_PARAM_OTP = "otp";

    override paths = [Edr.ApgEdr_Route_eShared.PAGE_OTP];


    async POST(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.ApgEdr_Service.GetEdrRequest(request);

        const rawEmail = await request.bodyParam(this.BODY_PARAM_EMAIL) as string;

        const rawOtp = await request.bodyParam(this.BODY_PARAM_OTP) as string;
        const otp = parseInt(rawOtp);

        const currentDateTime = Date.now();

        let r = Edr.ApgEdr_Auth_Service.VerifyOtp(rawEmail, otp, currentDateTime);

        let message = "";
        if (!r.ok) {
            message = "Error while generating JWT cookie: " + r.message;
        }
        else {
            const sessionId = Edr.ApgEdr_Service.GetSessionId(edr);

            r = await Edr.ApgEdr_Auth_Service.GetJwtCookie(rawEmail, sessionId);
            if (!r.ok) {
                message = "Error while generating JWT cookie: " + r.message;
            } else {
                response.setCookie(r.payload!.data as Uts.Std.Cookie);

            }
        }

        if (message !== "") {

            response.headers.delete('Set-Cookie');
            const cookie = Edr.ApgEdr_Auth_Service.DeleteJwtCookie();
            response.setCookie(cookie);

            // TODO: Create a function to redirect to error page -- AGP 20240731

            const templateData = Edr.ApgEdr_Service.GetTemplateData(
                edr,
                'Login error',
                "/pages/ApgEdr_HtmlPageTemplate_Error.html",
            )

            templateData.page.data = {
                error: message,
                okLink: '/'
            }

            await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData, {
                isCdnResource: true
            });
        }
        else {
            this.redirect(ApgEdr_eRoutes.PAGE_HOME, response);
        }
    }

}
