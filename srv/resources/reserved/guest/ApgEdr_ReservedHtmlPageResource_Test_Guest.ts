/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240912
 * ----------------------------------------------------------------------------
 */

import {
    Edr
} from "../../../deps.ts";
import {
    ApgEdr_eRoutes
} from "../../../enums/ApgEdr_eRoute.ts";



export class ApgEdr_ReservedHtmlPageResource_TestGuest
    extends Edr.ApgEdr_ReservedHtmlPageResource {

    override paths = [ApgEdr_eRoutes.RESERVED_PAGE_GUEST_TEST];

    readonly EDR_ROLE = Edr.ApgEdr_Auth_eRole.GUEST;
    override readonly RESOURCE_NAME = ApgEdr_ReservedHtmlPageResource_TestGuest.name;

    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {


        const edr = Edr.ApgEdr_Service.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'Guest page',
            "/pages/reserved/guest/ApgEdr_ReservedHtmlPageTemplate_Test_Guest.html",
        )

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData);
    }



}
