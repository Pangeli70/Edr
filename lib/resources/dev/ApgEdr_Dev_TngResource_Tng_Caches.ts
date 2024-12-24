/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * @version 1.3 APG 20240902 Better permissions management
 * ----------------------------------------------------------------------------
 */


import { Drash, Tng, Uts } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";



export class ApgEdr_Dev_TngResource_Tng_Caches

    extends ApgEdr_Auth_TngResource {


    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_Tng_Caches.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Tng caches",
    }
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Tng_Caches_01.html"
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

        templateData.page.data = Tng.ApgTng_Service.GetCaches();
        templateData.page.data.clearBtn = ApgEdr_Route_eShared.DEV_PAGE_TNG_CACHES + "?" + this.QS_PARAM_CACHE + "=" + this.QS_PARAM_CACHE_CLEAR;

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }


}
