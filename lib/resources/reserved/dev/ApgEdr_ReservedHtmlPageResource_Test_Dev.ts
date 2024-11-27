/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240912
 * @version 1.1 APG 20241113 Moved to shared resources
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



export class ApgEdr_ReservedHtmlPageResource_Test_Dev
    extends ApgEdr_ReservedHtmlPageResource {

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_DEV_TEST_DEV];

    readonly EDR_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly RESOURCE_NAME = ApgEdr_ReservedHtmlPageResource_Test_Dev.name;

    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {


        const edr = ApgEdr_Service.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Developer page',
            "/pages/reserved/dev/ApgEdr_ReservedHtmlPageTemplate_Test_Dev.html",
        )

        await ApgEdr_Service.RenderPageUsingTng(request, response, templateData);
    }



}
