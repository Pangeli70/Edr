/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240901
 * @version 1.1 APG 20241005
 * ----------------------------------------------------------------------------
*/


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
    ApgEdr_IRequest
} from "../../interfaces/ApgEdr_IRequest.ts";
import {
    ApgEdr_Service
} from "../../services/ApgEdr_Service.ts";
import {
    ApgEdr_HtmlPageResource
} from "../public/ApgEdr_HtmlPageResource.ts";




export abstract class ApgEdr_ReservedHtmlPageResource
    extends ApgEdr_HtmlPageResource {


    abstract readonly EDR_ROLE: ApgEdr_Auth_eRole;


    protected verifyPermissions(
        amethod: Function,
        arequest: Drash.Request,
        aresponse: Drash.Response,
        aedr: ApgEdr_IRequest
    ) {
        const authResult = ApgEdr_Service.VerifyProtectedPage(aedr, this.EDR_ROLE);

        if (authResult == ApgEdr_Auth_eResult.UNKNOWN) {
            this.loggedRedirect(amethod, aresponse, aedr, arequest.url, ApgEdr_Route_eShared.PAGE_REQ_OTP);
            return false;
        }
        else if (authResult == ApgEdr_Auth_eResult.INSUFF) {

            this.#errorInsuffPrivileges(amethod, arequest, aresponse, aedr);
            return false;
        }
        return true;
    }



    #errorInsuffPrivileges(
        amethod: Function,
        arequest: Drash.Request,
        aresponse: Drash.Response,
        aedr: ApgEdr_IRequest,
    ) {

        aedr.message = {
            title: "Error",
            text: "Insufficient privileges",
            next: ApgEdr_Route_eShared.PAGE_HOME
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
