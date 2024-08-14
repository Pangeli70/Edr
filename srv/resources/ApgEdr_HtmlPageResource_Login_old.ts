/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
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
    Edr
} from "../deps.ts";




export class ApgEdr_HtmlPageResource_Login extends Edr.Drash.Resource {

    override paths = [Edr.ApgEdr_Route_eShared.PAGE_LOGIN];


    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.ApgEdr_Service.GetEdrRequest(request);

        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'Login',
            "/pages/ApgEdr_HtmlPageTemplate_RequestOtp_01.html"
        )

        templateData.page.data = {
            action: Edr.ApgEdr_Route_eShared.PAGE_LOGIN
        }

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData);
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
            Edr.ApgEdr_Auth_Service.SetNewOtpForUser(rawEmail, newOtp, newOtpDateTime);
        }
        else {
            //response.redirect("/Apg/Edr/Auth/Login",);
        }

        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'Submit otp',
            "/pages/ApgEdr_HtmlPageTemplate_Login.html"
        )

        templateData.page.data = {
            email: rawEmail,
            action: Edr.ApgEdr_Route_eShared.PAGE_REQ_OTP,
            requestNewOtpLink: Edr.ApgEdr_Route_eShared.PAGE_LOGIN
        }


        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData, {
            isCdnResource: true
        });
    }

}
