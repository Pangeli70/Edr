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
    ApgEdr_Auth_IProfile
} from "../../../interfaces/ApgEdr_Auth_IProfile.ts";
import {
    ApgEdr_Auth_Service
} from "../../../services/ApgEdr_Auth_Service.ts";
import {
    ApgEdr_Service
} from "../../../services/ApgEdr_Service.ts";
import {
    ApgEdr_ReservedHtmlPageResource
} from "../ApgEdr_ReservedHtmlPageResource.ts";





export class ApgEdr_ReservedHtmlPageResource_Users

    extends ApgEdr_ReservedHtmlPageResource {


    override readonly RESOURCE_NAME = ApgEdr_ReservedHtmlPageResource_Users.name;
    override readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Users_01.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_USERS];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);

        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Users',
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const profiles: ApgEdr_Auth_IProfile[] = [];
        for (const profile in ApgEdr_Auth_Service.Profilations) {
            profiles.push(ApgEdr_Auth_Service.Profilations[profile])
        }

        templateData.page.data = {
            userRoute: ApgEdr_Route_eShared.RESERVED_PAGE_USER,
            profiles
        }

        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }





}
