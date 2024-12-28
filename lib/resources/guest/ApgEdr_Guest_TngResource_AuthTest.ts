/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Guest]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0.0 [APG 2024/09/12]
 * @version 1.0.1 [APG 2024/11/13] Moved to shared resources
 * @version 1.0.2 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Drash, Uts } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";




export class ApgEdr_Guest_TngResource_AuthTest

    extends ApgEdr_Auth_TngResource {


    override readonly RESOURCE_NAME = ApgEdr_Guest_TngResource_AuthTest.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Guest authorization Test",
        IT: "Test autorizzazione ospite"
    }
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.GUEST;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/guest/" + this.RESOURCE_NAME + ".html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    override paths = [ApgEdr_Route_eShared.DEV_PAGE_AUTH_TEST_GUEST];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {


        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            'Guest page',
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);

    }



}
