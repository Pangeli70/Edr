/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240912
 * @version 1.1 APG 20241113 Moved to shared resources
 * ----------------------------------------------------------------------------
 */

import { Drash, Uts } from "../../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service } from "../../../services/ApgEdr_Service.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";




export class ApgEdr_Auth_TngResource_Guest_AuthTest

    extends ApgEdr_Auth_TngResource {


    override readonly RESOURCE_NAME = ApgEdr_Auth_TngResource_Guest_AuthTest.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Guest authorization Test",
        IT: "Test autorizzazione ospite"
    }
    override readonly EDR_ROLE = ApgEdr_Auth_eRole.GUEST;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/reserved/guest/ApgEdr_ReservedHtmlPageTemplate_Test_Guest.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_DEV_TEST_GUEST];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {


        const edr = ApgEdr_Service.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Guest page',
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);

    }



}
