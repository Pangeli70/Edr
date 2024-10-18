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
} from "../../deps.ts";
import {
    ApgEdr_Route_eShared
} from "../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_IRequest
} from "../../interfaces/ApgEdr_IRequest.ts";
import {
    ApgEdr_Auth_Service
} from "../../services/ApgEdr_Auth_Service.ts";
import {
    ApgEdr_Service
} from "../../services/ApgEdr_Service.ts";
import {
    ApgEdr_HtmlPageResource
} from "./ApgEdr_HtmlPageResource.ts";



enum _eTranslation {
    POST_Error_Verify_OTP = "POST_Error_Verify_OTP",
    POST_Error_JWT_Cookie = "POST_Error_JWT_Cookie",
}



const _Translator = new Uts.ApgUts_Translator(
    {

        [_eTranslation.POST_Error_Verify_OTP]: {
            EN: "Error while verifying OTP for [[%1]] : [[%2]]",
            IT: "Errore durante la verifica della OTP per [[%1]] : [[%2]]",
        },
        [_eTranslation.POST_Error_JWT_Cookie]: {
            EN: "Error while generating JWT cookie for [[%1]] : [[%2]]",
            IT: "Errore durante la generazione del cookie JWT per [[%1]] : [[%2]]",
        },

    }
)


// This resource redirects to home page if succesful or to error page if not


export class ApgEdr_HtmlPageResource_Login extends
    ApgEdr_HtmlPageResource {


    override RESOURCE_NAME = "ApgEdr_HtmlPageResource_Login";

    readonly BODY_PARAM_EMAIL = "email";
    readonly BODY_PARAM_OTP = "otp";

    override paths = [ApgEdr_Route_eShared.PAGE_LOGIN];


    // async GET(
    //     request: Drash.Request,
    //     response: Drash.Response
    // ) {

    //     const edr = ApgEdr_Service.GetEdrRequest(request);

    //     const rawEmail = request.queryParam(this.BODY_PARAM_EMAIL) as string;

    //     const templateData = ApgEdr_Service.GetTemplateData(
    //         edr,
    //         Uts.ApgUts_Translator.Translate(_pageTranslations[_eCaption.GET_Title], edr.language),
    //         "/pages/ApgEdr_HtmlPageTemplate_Login_01.html"
    //     )

    //     templateData.page.data = {
    //         email: rawEmail,
    //         action: ApgEdr_Route_eShared.PAGE_LOGIN,
    //         requestNewOtpLink: ApgEdr_Route_eShared.PAGE_REQ_OTP
    //     }

    //     await ApgEdr_Service.RenderPageUsingTng(
    //         request,
    //         response,
    //         templateData,
    //         {
    //             isCdnTemplate: true
    //         }
    //     );
    // }



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
            errorMessage = _Translator.get(
                _eTranslation.POST_Error_Verify_OTP,
                edr.language,
                [rawEmail, r.joinMessages()]
            )
        }
        else {

            r = await ApgEdr_Auth_Service.GetJwtCookie(rawEmail);

            if (!r.ok) {
                errorMessage = _Translator.get(
                    _eTranslation.POST_Error_JWT_Cookie,
                    edr.language,
                    [rawEmail, r.joinMessages()]
                )
            } else {
                response.setCookie(r.payload as Uts.Std.Cookie);
            }
        }


        if (errorMessage !== "") {
            this.#errorDuringLogin(this.POST, request, response, edr, rawEmail, errorMessage);
            return;
        }
        else {
            this.redirect(ApgEdr_Route_eShared.PAGE_HOME, response);
        }
    }



    #errorDuringLogin(
        amethod: Function,
        arequest: Drash.Request,
        aresponse: Drash.Response,
        aedr: ApgEdr_IRequest,
        arawEmail: string,
        aerrorMessage: string,
    ) {

        // Delete the cookie anyways
        aresponse.headers.delete('Set-Cookie');
        const cookie = ApgEdr_Auth_Service.DeleteJwtCookie();
        aresponse.setCookie(cookie);

        const backPage = ApgEdr_Route_eShared.PAGE_LOGIN + "?" + this.BODY_PARAM_EMAIL + "=" + arawEmail;

        aedr.message = {
            title: "Error",
            text: aerrorMessage,
            next: backPage
        };

        // Log the error
        ApgEdr_Service.Error(
            this.RESOURCE_NAME,
            amethod,
            aedr
        );

        this.loggedRedirectToError(amethod, aresponse, aedr, arequest.url);
    }
}