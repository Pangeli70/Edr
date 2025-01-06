/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/09/01]
 * @version 1.0.1 [APG 2024/10/05]
 * @version 1.0.2 [APG 2024/11/07] Better logging
 * @version 1.0.3 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
*/


import { ApgEdr_Request } from "../classes/ApgEdr_Request.ts";
import { Drash } from "../deps.ts";
import { ApgEdr_Auth_eResult } from "../enums/ApgEdr_Auth_eResult.ts";
import { ApgEdr_Auth_eRole } from "../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_eRoute } from "../enums/ApgEdr_eRoute.ts";
import { ApgEdr_Service_Core } from "../services/ApgEdr_Service_Core.ts";
import { ApgEdr_TngResource_Base } from "./ApgEdr_TngResource_Base.ts";



/**
 * Authorized Tng Resource. The user must be logged in and have the right role
 * to access the resource.
 */
export abstract class ApgEdr_TngResource_Auth_Base

    extends ApgEdr_TngResource_Base {


    /**
     * Abstract property Must be overridden by subclasses
     */
    abstract readonly AUTH_ROLE: ApgEdr_Auth_eRole;



    protected verifyPermissions(
        aedr: ApgEdr_Request,
        amethodName: string,
        arequest: Drash.Request,
        aresponse: Drash.Response,
    ) {
        const authResult = ApgEdr_Service_Core.VerifyProtectedPage(aedr, this.AUTH_ROLE);

        if (authResult == ApgEdr_Auth_eResult.OK) {
            return true;
        }

        if (authResult == ApgEdr_Auth_eResult.UNKNOWN) {
            this.logAndRedirect(aedr, amethodName, arequest.url, ApgEdr_eRoute.PAGE_REQ_OTP, aresponse);
            return false;
        }

        if (authResult == ApgEdr_Auth_eResult.INSUFF) {

            this.#handleInsuffPrivilegesError(aedr, amethodName, arequest, aresponse,);
            return false;
        }

        return true;
    }



    #handleInsuffPrivilegesError(
        aedr: ApgEdr_Request,
        amethodName: string,
        arequest: Drash.Request,
        aresponse: Drash.Response,
    ) {

        aedr.message = {
            title: "Error",
            text: "Insufficient privileges",
            next: ApgEdr_eRoute.PAGE_HOME
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
