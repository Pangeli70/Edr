/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240901
 * @version 1.1 APG 20241005
 * @version 1.1 APG 20241107 Better logging
 * ----------------------------------------------------------------------------
*/


import { ApgEdr_Request } from "../../classes/ApgEdr_Request.ts";
import {
    Drash
} from "../../deps.ts";
import {
    ApgEdr_Auth_eResult
} from "../../enums/ApgEdr_Auth_eResult.ts";
import {
    ApgEdr_Auth_eRole
} from "../../enums/ApgEdr_Auth_eRole.ts";
import {
    ApgEdr_Route_eShared
} from "../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_Service
} from "../../services/ApgEdr_Service.ts";
import {
    ApgEdr_HtmlPageResource
} from "../public/ApgEdr_HtmlPageResource.ts";




export abstract class ApgEdr_ReservedHtmlPageResource
    extends ApgEdr_HtmlPageResource {


    /**
     * Abstract property Must be overridden by subclasses
     */
    abstract readonly EDR_ROLE: ApgEdr_Auth_eRole;



    protected verifyPermissions(
        aedr: ApgEdr_Request,
        amethodName: string,
        arequest: Drash.Request,
        aresponse: Drash.Response,
    ) {
        const authResult = ApgEdr_Service.VerifyProtectedPage(aedr, this.EDR_ROLE);

        if (authResult == ApgEdr_Auth_eResult.UNKNOWN) {
            this.logAndRedirect(aedr, amethodName, arequest.url, ApgEdr_Route_eShared.PAGE_REQ_OTP, aresponse);
            return false;
        }
        else if (authResult == ApgEdr_Auth_eResult.INSUFF) {

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
            next: ApgEdr_Route_eShared.PAGE_HOME
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
