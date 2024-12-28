/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0.0 [APG 2024/07/08] Moving fro apg-tng to Edr
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
]



export class ApgEdr_Dev_TngResource_Tng_Caches

    extends ApgEdr_Auth_TngResource {


    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_Tng_Caches.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Tng caches",
    }
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/dev/" + this.RESOURCE_NAME + ".html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly QS_PARAM_CACHE = 'Cache';
    readonly QS_PARAM_CACHE_CLEAR = 'clear';

    override paths = [ApgEdr_Route_eShared.DEV_PAGE_TNG_CACHES];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;


        const rawCache = request.queryParam(this.QS_PARAM_CACHE);
        if (rawCache === this.QS_PARAM_CACHE_CLEAR) {
            Tng.ApgTng_Service.ClearCache();
        }


        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const topMenu = this.getTranslatedLinks(NavBar, edr.language);

        const caches = Tng.ApgTng_Service.GetCaches();
        for (const chunk of caches.chunks) {
            chunk.key = ApgEdr_Route_eShared.DEV_PAGE_TNG_CHUNK + "/" + encodeURIComponent(chunk.key);
        }
        for (const func of caches.functions) {
            func.key = ApgEdr_Route_eShared.DEV_PAGE_TNG_FUNCTION + "/" + encodeURIComponent(func.key);
        }
        for (const file of caches.files) {
            file.key = ApgEdr_Route_eShared.DEV_PAGE_TNG_FILE + "/" + encodeURIComponent(file.key); 
        }

        templateData.page.data = {
            topMenu,
            caches,
            clearBtn : ApgEdr_Route_eShared.DEV_PAGE_TNG_CACHES + "?" + this.QS_PARAM_CACHE + "=" + this.QS_PARAM_CACHE_CLEAR
        }

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }


}
