/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240813
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



export class ApgEdr_ReservedHtmlPageResource_User_Unlock extends Drash.Resource {

    readonly PATH_PARAM_ID = 'id';

    readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;


    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_USER_UNLOCK + "/:" + this.PATH_PARAM_ID];


    GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdrRequest(request);
        if (!ApgEdr_Service.VerifyProtectedPage(edr, this.EDR_ROLE)) {
            this.redirect(ApgEdr_Route_eShared.PAGE_LOGIN, response);
            return;
        }

        const rawId = request.pathParam(this.PATH_PARAM_ID)!;

        const auth = ApgEdr_Auth_Service.Authentications[rawId];

        if (!auth) {
            this.#errorUserNotFound(response, edr, rawId);
            return;
        }

        ApgEdr_Auth_Service.UnlockUser(rawId)

        const route = ApgEdr_Route_eShared.RESERVED_PAGE_USER + "/" + rawId;
        this.redirect(route, response);
    }




    #errorUserNotFound(
        response: Drash.Response,
        aedr: ApgEdr_IRequest,
        arawId: string,
    ) {
        const message = "User with email " + arawId + " not found";
        ApgEdr_Service.Error(
            import.meta.url,
            this.GET,
            aedr,
            message,
            ApgEdr_Route_eShared.RESERVED_PAGE_USERS
        );

        const errorPage = ApgEdr_Route_eShared.PAGE_ERROR + "/" + aedr.counter.toString();
        this.redirect(errorPage, response);
    }
}
