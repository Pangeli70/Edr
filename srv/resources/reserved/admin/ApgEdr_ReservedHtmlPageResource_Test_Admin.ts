/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240701 Cleanup
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.1 APG 20240912 Better permissions management
 * ----------------------------------------------------------------------------
 */

import {
    Edr,
} from "../../../deps.ts";
import {
    ApgEdr_eRoutes
} from "../../../enums/ApgEdr_eRoute.ts";



export class ApgEdr_ReservedHtmlPageResource_TestAdmin
    extends Edr.ApgEdr_ReservedHtmlPageResource {

    override paths = [ApgEdr_eRoutes.RESERVED_PAGE_ADMIN_TEST];

    readonly EDR_ROLE = Edr.ApgEdr_Auth_eRole.ADMIN;
    readonly RESOURCE_NAME = ApgEdr_ReservedHtmlPageResource_TestAdmin.name;

    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.ApgEdr_Service.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'Admin page',
            "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Test_Admin.html",
        )

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData);
    }


}
