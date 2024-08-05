/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240701 Cleanup and alignment to ApgCdn
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * ----------------------------------------------------------------------------
 */

import {
    Edr,
} from "../../../deps.ts";
import {
    ApgEdr_eRoutes
} from "../../../enums/ApgEdr_eRoute.ts";



export class ApgEdr_ReservedHtmlPageResource_Admin extends Edr.Drash.Resource {

    override paths = [ApgEdr_eRoutes.RESERVED_PAGE_ADMIN_TEST];

    readonly EDR_ROLE = Edr.ApgEdr_Auth_eRole.ADMIN;

    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.ApgEdr_Service.GetEdrRequest(request);
        if (!Edr.ApgEdr_Service.VerifyProtectedPage(edr, this.EDR_ROLE)) {
            this.redirect(Edr.ApgEdr_Route_eShared.PAGE_LOGIN, response);
            return;
        }

        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'Admin page',
            "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Admin.html",
        )

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData);
    }





}
