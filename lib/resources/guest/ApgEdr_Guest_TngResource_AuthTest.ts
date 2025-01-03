/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Guest]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/09/12]
 * @version 1.0.1 [APG 2024/11/13] Moved to shared resources
 * @version 1.0.2 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Drash } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_eRoute } from "../../enums/ApgEdr_eRoute.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_TngResource_Auth_Base } from "../ApgEdr_TngResource_Auth_Base.ts";
import { ApgEdr_TngResource_Message_Base } from "../ApgEdr_TngResource_Message_Base.ts";



export class ApgEdr_Guest_TngResource_AuthTest

    extends ApgEdr_TngResource_Auth_Base {


    override readonly RESOURCE_NAME = ApgEdr_Guest_TngResource_AuthTest.name;
    override readonly TITLE = "Guest authorization Test";
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/public/" + ApgEdr_TngResource_Message_Base.name + ".html"
    };

    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.GUEST;

    override paths = [ApgEdr_eRoute.DEV_PAGE_AUTH_TEST_GUEST];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {


        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            this.TITLE,
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const message = `
        To view the content of this page your need to be logged in and have at least the role of [Guest].<br><br>
        You are logged in as [${templateData.user.email}] and you have granted the role of [${templateData.user.role}] for this microservice.
        `;
        templateData.page.data = {
            message: message,
            okLink: ApgEdr_eRoute.PAGE_MENU_TEST_AUTH
        };

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);

    }



}
