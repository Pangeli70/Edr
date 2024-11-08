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
    ApgEdr_Request
} from "../../../classes/ApgEdr_Request.ts";
import {
    ApgEdr_Auth_Service
} from "../../../services/ApgEdr_Auth_Service.ts";
import {
    ApgEdr_Service
} from "../../../services/ApgEdr_Service.ts";
import {
    ApgEdr_ReservedHtmlPageResource
} from "../ApgEdr_ReservedHtmlPageResource.ts";



export class ApgEdr_ReservedHtmlPageResource_User
    extends ApgEdr_ReservedHtmlPageResource {

    readonly PATH_PARAM_USER_ID = 'id';

    override readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;
    override readonly RESOURCE_NAME = ApgEdr_ReservedHtmlPageResource_User.name;


    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_USER + "/:" + this.PATH_PARAM_USER_ID];


    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);

        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const rawId = request.pathParam(this.PATH_PARAM_USER_ID)!;

        const profile = ApgEdr_Auth_Service.Profilations[rawId];
        const role = ApgEdr_Auth_Service.Authorizations[rawId];
        const user = ApgEdr_Auth_Service.Authentications[rawId];

        if (!profile) {
            this.#handleUserNotFoundError(edr, this.GET.name, request, response, rawId);
            return;
        }


        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'User details',
            "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_User_01.html",
        )


        templateData.page.data = {
            usersRoute: ApgEdr_Route_eShared.RESERVED_PAGE_USERS,
            unlockRoute: ApgEdr_Route_eShared.RESERVED_PAGE_USER_UNLOCK,
            profile,
            role,
            user
        }


        await ApgEdr_Service.RenderPageUsingTng(
            request,
            response,
            templateData,
            {
                isCdnTemplate: true
            }
        );
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
            ApgEdr_ReservedHtmlPageResource_User.name,
            this.GET.name,
        );

        this.logAndRedirectToErrorPage(aedr, amethodName, aresponse, arequest.url);
    }
}
