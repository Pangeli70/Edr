/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240813
 * @version 1.1 APG 20240902 Better permissions management
 * ----------------------------------------------------------------------------
 */


import {
    Drash
} from "../../../deps.ts";
import {
    ApgEdr_Auth_eRole
} from "../../../enums/ApgEdr_Auth_eRole.ts";
import {
    ApgEdr_Route_eShared
} from "../../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_IRequest
} from "../../../interfaces/ApgEdr_IRequest.ts";
import {
    ApgEdr_Auth_Service
} from "../../../services/ApgEdr_Auth_Service.ts";
import {
    ApgEdr_Service
} from "../../../services/ApgEdr_Service.ts";
import {
    ApgEdr_ReservedHtmlPageResource
} from "../ApgEdr_ReservedHtmlPageResource.ts";



export class ApgEdr_ReservedHtmlPageResource_User_Unlock
    
    extends ApgEdr_ReservedHtmlPageResource {

    readonly PATH_PARAM_ID = 'id';

    override readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;
    override readonly RESOURCE_NAME = ApgEdr_ReservedHtmlPageResource_User_Unlock.name;


    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_USER_UNLOCK + "/:" + this.PATH_PARAM_ID];


    GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdrRequest(request);
        if (!this.verifyPermissions(this.GET, request, response, edr)) return;

        const rawId = request.pathParam(this.PATH_PARAM_ID)!;

        const user = ApgEdr_Auth_Service.Authentications[rawId];

        if (!user) {
            this.#errorUserNotFound(this.GET, request, response, edr, rawId);
            return;
        }

        ApgEdr_Auth_Service.UnlockUser(rawId)

        const route = ApgEdr_Route_eShared.RESERVED_PAGE_USER + "/" + rawId;
        this.redirect(route, response);
    }



    #errorUserNotFound(
        amethod: Function,
        arequest: Drash.Request,
        aresponse: Drash.Response,
        aedr: ApgEdr_IRequest,
        arawId: string,
    ) {

        aedr.message = {
            title: "Error",
            text: "User with email " + arawId + " not found",
            next: ApgEdr_Route_eShared.RESERVED_PAGE_USERS
        }

        ApgEdr_Service.Error(
            ApgEdr_ReservedHtmlPageResource_User_Unlock.name,
            this.GET,
            aedr
        );

        this.loggedRedirectToError(amethod, aresponse, aedr, arequest.url);
    }
}
