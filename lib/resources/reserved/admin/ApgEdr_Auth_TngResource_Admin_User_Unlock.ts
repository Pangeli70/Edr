/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240813
 * @version 1.1 APG 20240902 Better permissions management
 * @version 1.2 APG 20241107 Better error management
 * ----------------------------------------------------------------------------
 */


import { ApgEdr_Request } from "../../../classes/ApgEdr_Request.ts";
import { Drash, Uts } from "../../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Auth_Service } from "../../../services/ApgEdr_Auth_Service.ts";
import { ApgEdr_Service } from "../../../services/ApgEdr_Service.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";



export class ApgEdr_Auth_TngResource_User_Unlock

    extends ApgEdr_Auth_TngResource {

    
    override readonly RESOURCE_NAME = ApgEdr_Auth_TngResource_User_Unlock.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "",
    }
    override readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;
    override readonly TNG_TEMPLATES = {}
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly PATH_PARAM_ID = 'id';

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_USER_UNLOCK + "/:" + this.PATH_PARAM_ID];


    GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response,)) return;

        const rawId = request.pathParam(this.PATH_PARAM_ID)!;

        const user = ApgEdr_Auth_Service.Authentications[rawId];

        if (!user) {
            this.#handleUserNotFoundError(edr, this.GET.name, request, response, rawId);
            return;
        }

        ApgEdr_Auth_Service.UnlockUser(rawId)

        const route = ApgEdr_Route_eShared.RESERVED_PAGE_USER + "/" + rawId;
        this.redirect(route, response);
    }



    #handleUserNotFoundError(
        aedr: ApgEdr_Request,
        amethodName: string,
        arequest: Drash.Request,
        aresponse: Drash.Response,
        arawId: string,
    ) {

        aedr.message = {
            title: "Error",
            text: "User with email " + arawId + " not found",
            next: ApgEdr_Route_eShared.RESERVED_PAGE_USERS
        }

        ApgEdr_Service.HandleError(
            aedr,
            ApgEdr_Auth_TngResource_User_Unlock.name,
            this.GET.name,
        );

        this.logAndRedirectToErrorPage(aedr, amethodName, aresponse, arequest.url);
    }
}
