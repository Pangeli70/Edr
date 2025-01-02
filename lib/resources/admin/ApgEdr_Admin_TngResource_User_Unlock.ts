/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Admin]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/08/13]
 * @version 1.0.1 [APG 2024/09/02] Better permissions management
 * @version 1.0.2 [APG 2024/11/07] Better error management
 * @version 1.0.3 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { ApgEdr_Request } from "../../classes/ApgEdr_Request.ts";
import { Drash } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Auth } from "../../services/ApgEdr_Service_Auth.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_TngResource_Auth_Base } from "../ApgEdr_TngResource_Auth_Base.ts";



export class ApgEdr_Admin_TngResource_User_Unlock

    extends ApgEdr_TngResource_Auth_Base {

    
    override readonly RESOURCE_NAME = ApgEdr_Admin_TngResource_User_Unlock.name;
    override readonly TITLE= "Title to be defined"
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.ADMIN;
    override readonly TNG_TEMPLATES = {}
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly PATH_PARAM_ID = 'id';

    override paths = [ApgEdr_Route_eShared.ADMIN_PAGE_USER_UNLOCK + "/:" + this.PATH_PARAM_ID];


    GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response,)) return;

        const rawId = request.pathParam(this.PATH_PARAM_ID)!;

        const user = ApgEdr_Service_Auth.Authentications[rawId];

        if (!user) {
            this.#handleUserNotFoundError(edr, this.GET.name, request, response, rawId);
            return;
        }

        ApgEdr_Service_Auth.UnlockUser(rawId)

        const route = ApgEdr_Route_eShared.ADMIN_PAGE_USER + "/" + rawId;
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
            next: ApgEdr_Route_eShared.ADMIN_PAGE_USERS
        }

        ApgEdr_Service_Core.HandleError(
            aedr,
            ApgEdr_Admin_TngResource_User_Unlock.name,
            this.GET.name,
        );

        this.logAndRedirectToErrorPage(aedr, amethodName, aresponse, arequest.url);
    }
}
