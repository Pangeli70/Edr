/** ---------------------------------------------------------------------------
 * @module [BrdEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240701 Cleanup and alignment to BrdCdn
 * ----------------------------------------------------------------------------
 */

import {
    BrdEdr_Microservice,
    Edr, Tng, Uts
} from "../deps.ts";
import {
    BrdEdr_eRoutes
} from "../enums/BrdEdr_eRoute.ts";




export class BrdEdr_HtmlPageResource_Otp extends Edr.Drash.Resource {

    override paths = [BrdEdr_eRoutes.PAGE_OTP];


    async POST(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const rawEmail = await request.bodyParam('email') as string;
        const rawOtp = await request.bodyParam('otp') as string;
        const otp = parseInt(rawOtp);
        const currentDateTime = Date.now();

        let r = Edr.BrdEdr_Auth_Service.VerifyOtp(rawEmail, otp, currentDateTime);
        let message = "";
        if (!r.ok) {
            message = "Error while generating JWT cookie: " + r.message;
        }
        else {
            r = await Edr.BrdEdr_Auth_Service.GetJwtCookie(rawEmail);
            if (!r.ok) {
                message = "Error while generating JWT cookie: " + r.message;
            } else {
                response.setCookie(r.payload!.data as Uts.Std.Cookie);

            }
        }

        if (message !== "") {

            response.headers.delete('Set-Cookie');
            const cookie = Edr.BrdEdr_Auth_Service.DeleteJwtCookie();
            response.setCookie(cookie);

            const pageData: Tng.BrdTng_IPageData = {
                microservice: {
                    name: BrdEdr_Microservice.name,
                    title: BrdEdr_Microservice.description,
                },

                page: {
                    template: "/pages/BrdEdr_HtmlPageTemplate_Error.html",
                    title: 'Login error',
                    rendered: new Date().toLocaleString(),
                    data: {
                        lang: "EN",
                        error: message,
                        redirect: '/'
                    }
                },

                user: {
                    role: Edr.BrdEdr_Auth_eRole.GUEST
                }
            }

            await Edr.BrdEdr_Service.RenderPageUsingBrdTng(request, response, pageData, true);
        }
        else {
            this.redirect(BrdEdr_eRoutes.PAGE_HOME, response);
        }
    }

}
