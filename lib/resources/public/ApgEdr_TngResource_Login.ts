/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/09] Alpha version
 * @version 0.9.2 [APG 2023/04/16] Moved to its own microservice
 * @version 0.9.3 [APG 2024/01/06] Revamped
 * @version 1.0.0 [APG 2024/07/01] Cleanup
 * @version 1.0.1 [APG 2024/07/31] ApgEdr_Service.GetTemplateData
 * @version 1.0.2 [APG 2024/08/13] Moved to lib
 * @version 1.0.3 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { ApgEdr_Request } from "../../classes/ApgEdr_Request.ts";
import { Drash, Uts } from "../../deps.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Auth } from "../../services/ApgEdr_Service_Auth.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_TngResource_Base } from "../ApgEdr_TngResource_Base.ts";



enum _eTranslation {
    POST_Error_Title = "POST_Error_Title",
    POST_Error_Verify_OTP = "POST_Error_Verify_OTP",
    POST_Error_JWT_Cookie = "POST_Error_JWT_Cookie",
}



const _Translator = new Uts.ApgUts_Translator(
    {
        [_eTranslation.POST_Error_Title]: {
            EN: "Login error",
            IT: "Errore di accesso",
        },
        [_eTranslation.POST_Error_Verify_OTP]: {
            EN: "Error while verifying OTP for [[%1]]:<br><br> [[%2]]",
            IT: "Errore durante la verifica della OTP per [[%1]]:<br><br> [[%2]]",
        },
        [_eTranslation.POST_Error_JWT_Cookie]: {
            EN: "Error while generating JWT cookie for [[%1]]:<br><br> [[%2]]",
            IT: "Errore durante la generazione del cookie JWT per [[%1]]:<br><br> [[%2]]",
        },

    }
)



// This resource redirects to home page if succesful or to error page if not
export class ApgEdr_TngResource_Login
    
    extends ApgEdr_TngResource_Base {


    override readonly RESOURCE_NAME = ApgEdr_TngResource_Login.name;
    override readonly TITLE = "Login";
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    override readonly TNG_TEMPLATES = {};

    readonly BODY_PARAM_EMAIL = "email";
    readonly BODY_PARAM_OTP = "otp";

    override paths = [ApgEdr_Route_eShared.PAGE_LOGIN];


    async POST(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);

        const rawEmail = await request.bodyParam(this.BODY_PARAM_EMAIL) as string;

        const rawOtp = await request.bodyParam(this.BODY_PARAM_OTP) as string;
        const otp = parseInt(rawOtp);

        const currentDateTime = Date.now();


        let r = ApgEdr_Service_Auth.VerifyOtp(rawEmail, otp, currentDateTime, edr.language);


        let errorMessage = "";
        if (!r.ok) {
            errorMessage = _Translator.get(
                _eTranslation.POST_Error_Verify_OTP,
                edr.language,
                [rawEmail, r.joinMessages()]
            )
        }
        else {

            r = await ApgEdr_Service_Auth.GetJwtCookie(rawEmail);

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
        const cookie = ApgEdr_Service_Auth.DeleteJwtCookie();
        aresponse.setCookie(cookie);

        const backPage = ApgEdr_Route_eShared.PAGE_REQ_OTP + "?" + this.BODY_PARAM_EMAIL + "=" + arawEmail;

        aedr.message = {
            title: _Translator.get(_eTranslation.POST_Error_Title, aedr.language),
            text: aerrorMessage,
            next: backPage
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
