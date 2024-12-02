/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240701 Cleanup
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20241113 Moved in shared resources
 * @version 1.3 APG 20241201 TNG_TEMPLATES and cleanup
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
    ApgEdr_Service
} from "../../../services/ApgEdr_Service.ts";
import {
    ApgEdr_ReservedHtmlPageResource
} from "../ApgEdr_ReservedHtmlPageResource.ts";



export class ApgEdr_ReservedHtmlPageResource_Test_User

    extends ApgEdr_ReservedHtmlPageResource {


    readonly RESOURCE_NAME = ApgEdr_ReservedHtmlPageResource_Test_User.name;
    readonly EDR_ROLE = ApgEdr_Auth_eRole.USER;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/reserved/user/ApgEdr_ReservedHtmlPageTemplate_Test_User.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_DEV_TEST_USER];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'User page',
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const {html, events} = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }



}
