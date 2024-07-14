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
    Edr, Tng
} from "../deps.ts";




export class BrdEdr_HtmlPageResource_Login extends Edr.Drash.Resource {

    override paths = [Edr.BrdEdr_Route_eShared.PAGE_LOGIN];



    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const pageData: Tng.BrdTng_IPageData = {
            microservice: {
                name: BrdEdr_Microservice.name,
                title: BrdEdr_Microservice.description,
            },

            page: {
                template: "/pages/BrdEdr_HtmlPageTemplate_RequestOtp.html",
                title: 'Login',
                rendered: new Date().toLocaleString(),
                data: {
                    lang: "EN"
                }
            },

            user: {
                role: Edr.BrdEdr_Auth_eRole.GUEST
            }
        }

        await Edr.BrdEdr_Service.RenderPageUsingBrdTng(request, response, pageData);
    }



    async POST(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const rawEmail = await request.bodyParam('email') as string;
        const newOtp = Edr.BrdEdr_Auth_Service.GenerateOTP();
        const newOtpDateTime = Date.now();
        const res = await Edr.BrdEdr_Mail_Service.SendEmail(
            "BrdEdr <login@apg-web-dev-24.it>",
            [rawEmail],
            "BrdEdr OTP",
            "Your OTP is: " + newOtp,
        )

        if (res.ok) {
            Edr.BrdEdr_Auth_Service.NewOtp(rawEmail, newOtp, newOtpDateTime);
        }
        else {
            //response.redirect("/Brd/Edr/Auth/Login",);
        }

        const pageData: Tng.BrdTng_IPageData = {
            microservice: {
                name: BrdEdr_Microservice.name,
                title: BrdEdr_Microservice.description,
            },

            page: {
                template: "/pages/BrdEdr_HtmlPageTemplate_Login.html",
                title: 'Submit otp',
                rendered: new Date().toLocaleString(),
                data: {
                    lang: "EN",
                    email: rawEmail
                }
            },

            user: {
                role: Edr.BrdEdr_Auth_eRole.GUEST
            }
        }


        await Edr.BrdEdr_Service.RenderPageUsingBrdTng(request, response, pageData, {
            isEdrSharedResource: true
        });
    }

}
