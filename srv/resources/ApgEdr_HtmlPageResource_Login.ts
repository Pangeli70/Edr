/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240701 Cleanup and alignment to ApgCdn
 * ----------------------------------------------------------------------------
 */

import {
    ApgEdr_Microservice,
    Edr, Tng
} from "../deps.ts";




export class ApgEdr_HtmlPageResource_Login extends Edr.Drash.Resource {

    override paths = [Edr.ApgEdr_Route_eShared.PAGE_LOGIN];



    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.ApgEdr_Service.GetEdrRequest(request);


        const pageData: Tng.ApgTng_IPageData = {
           
            microservice: {
                name: ApgEdr_Microservice.name,
                title: ApgEdr_Microservice.description,
            },

            page: {
                assetsHost: "",
                master: "/master/ApgCdn_MasterPage_Application_V01.html",
                template: "/pages/ApgEdr_HtmlPageTemplate_RequestOtp.html",
                favicon: "Apg_2024_V01",
                logoJs: "Apg_2024_V01",
                title: 'Login',
                rendered: new Date().toLocaleString(),
                data: {
                    lang: edr.language,
                    action: Edr.ApgEdr_Route_eShared.PAGE_LOGIN
                }
            },

            user: Edr.ApgEdr_Service.GetUserData(edr)
        }

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, pageData);
    }



    async POST(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.ApgEdr_Service.GetEdrRequest(request);

        const rawEmail = await request.bodyParam('email') as string;
        const newOtp = Edr.ApgEdr_Auth_Service.GenerateOTP();
        const newOtpDateTime = Date.now();
        const res = await Edr.ApgEdr_ResendMail_Service.SendEmail(
            "ApgEdr <login@apg-web-dev-24.it>",
            [rawEmail],
            "ApgEdr OTP",
            "Your OTP is: " + newOtp,
        )

        if (res.ok) {
            Edr.ApgEdr_Auth_Service.NewOtp(rawEmail, newOtp, newOtpDateTime);
        }
        else {
            //response.redirect("/Apg/Edr/Auth/Login",);
        }

        const pageData: Tng.ApgTng_IPageData = {
            microservice: {
                name: ApgEdr_Microservice.name,
                title: ApgEdr_Microservice.description,
            },

            page: {
                assetsHost: Edr.ApgEdr_Service.GetAssetsHost(),
                master: "/master/ApgCdn_MasterPage_Application_V01.html",
                template: "/pages/ApgEdr_HtmlPageTemplate_Login.html",
                favicon: "Apg_2024_V01",
                logoJs: "Apg_2024_V01",
                title: 'Submit otp',
                rendered: new Date().toLocaleString(),
                data: {
                    lang: edr.language,
                    email: rawEmail,
                    action: Edr.ApgEdr_Route_eShared.PAGE_OTP
                }
            },

            user: Edr.ApgEdr_Service.GetUserData(edr)
        }


        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, pageData, {
            isEdrSharedResource: true
        });
    }

}
