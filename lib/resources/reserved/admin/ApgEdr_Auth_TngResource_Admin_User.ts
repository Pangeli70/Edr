/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240813
 * @version 1.1 APG 20240902 Better permissions management
 * ----------------------------------------------------------------------------
 */


import { Drash, Uts } from "../../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../../enums/ApgEdr_Route_eShared.ts";

import { ApgEdr_Request } from "../../../classes/ApgEdr_Request.ts";
import { ApgEdr_Auth_Service } from "../../../services/ApgEdr_Auth_Service.ts";
import { ApgEdr_Service } from "../../../services/ApgEdr_Service.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";



export class ApgEdr_Auth_TngResource_User

    extends ApgEdr_Auth_TngResource {


    override readonly RESOURCE_NAME = ApgEdr_Auth_TngResource_User.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "User details",
    }
    override readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_User_01.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly PATH_PARAM_USER_ID = 'id';

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
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )


        templateData.page.data = {
            usersRoute: ApgEdr_Route_eShared.RESERVED_PAGE_USERS,
            unlockRoute: ApgEdr_Route_eShared.RESERVED_PAGE_USER_UNLOCK,
            profile,
            role,
            user
        }


        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
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
            ApgEdr_Auth_TngResource_User.name,
            this.GET.name,
        );

        this.logAndRedirectToErrorPage(aedr, amethodName, aresponse, arequest.url);
    }
}
