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

import { ApgEdr_Request } from "../../classes/ApgEdr_Request.ts";
import { Drash, Uts } from "../../deps.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Auth_Service } from "../../services/ApgEdr_Auth_Service.ts";
import { ApgEdr_Service } from "../../services/ApgEdr_Service.ts";
import { ApgEdr_TngResource } from "./ApgEdr_TngResource.ts";



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
export class ApgEdr_TngResource_Login
    
    extends ApgEdr_TngResource {


    override readonly RESOURCE_NAME = ApgEdr_TngResource_Login.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Login",
        IT: "Accesso",
    }
    override readonly TNG_TEMPLATES = {};
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly BODY_PARAM_EMAIL = "email";
    readonly BODY_PARAM_OTP = "otp";

    override paths = [ApgEdr_Route_eShared.PAGE_LOGIN];


    async POST(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);

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
            this.#handleLoginError(edr, this.POST.name, request, response, rawEmail, errorMessage);
            return;
        }
        else {
            this.redirect(ApgEdr_Route_eShared.PAGE_HOME, response);
        }
    }



    #handleLoginError(
        aedr: ApgEdr_Request,
        amethodName: string,
        arequest: Drash.Request,
        aresponse: Drash.Response,
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
        ApgEdr_Service.HandleError(
            aedr,
            this.RESOURCE_NAME,
            amethodName,
        );

        this.logAndRedirectToErrorPage(aedr, amethodName, aresponse, arequest.url);
    }
}
