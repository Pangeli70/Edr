/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0.0 [APG 2024/07/28] Moving fro apg-tng to Edr
 * @version 1.0.1 [APG 2024/07/31] ApgEdr_Service.GetTemplateData
 * @version 1.0.2 [APG 2024/08/13] Moved to lib
 * @version 1.0.3 [APG 2024/09/02] Better permissions management
 * @version 1.0.4 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Drash, Tng, Uts } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";
import { ApgEdr_Shared_Links } from "../data/ApgEdr_Resources_Links.ts";


const NavBar = [
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_HOME],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_DEV],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_DEV_TENGINE],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.DEV_PAGE_TNG_CACHES],
]


export class ApgEdr_Dev_TngResource_Tng_Chunk

    extends ApgEdr_Auth_TngResource {

    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_Tng_Chunk.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Tng chunk",
    }
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/dev/ApgEdr_Dev_TngResource_Tng_Content.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly PATH_PARAM_ID = 'id'

    override paths = [ApgEdr_Route_eShared.DEV_PAGE_TNG_CHUNK + "/:" + this.PATH_PARAM_ID];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const rawId = request.pathParam(this.PATH_PARAM_ID)!;

        const chunk = Tng.ApgTng_Service.GetChunkFromCache(parseInt(rawId));

        chunk.content = Uts.ApgUts.EscapeHTML(chunk.content.toString());

        const backLink = ApgEdr_Route_eShared.DEV_PAGE_TNG_CACHES + "#Chunk_" + chunk.id;

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const topMenu = this.getTranslatedLinks(NavBar, edr.language);

        templateData.page.data = {
            topMenu,
            id: chunk.id,
            content: chunk.content,
            backLink
        };

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }





}
