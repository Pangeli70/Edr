/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240912
 * @version 1.1 APG 20241113 Moved to shared resources
 * ----------------------------------------------------------------------------
 */

import { Drash, Uts } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";



export class ApgEdr_Dev_TngResource_AuthTest

    extends ApgEdr_Auth_TngResource {


    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_AuthTest.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Developer authorization Test",
        IT: "Test autorizzazione sviluppatore"
    }
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/reserved/dev/ApgEdr_ReservedHtmlPageTemplate_Test_Dev.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    override paths = [ApgEdr_Route_eShared.DEV_PAGE_AUTH_TEST_DEV];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {


        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }



}
