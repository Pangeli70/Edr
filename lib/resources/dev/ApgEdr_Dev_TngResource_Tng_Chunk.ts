/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240728
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * @version 1.3 APG 20240902 Better permissions management
 * ----------------------------------------------------------------------------
 */


import {Drash, Tng, Uts} from "../../deps.ts";
import {ApgEdr_Auth_eRole} from "../../enums/ApgEdr_Auth_eRole.ts";
import {ApgEdr_Route_eShared} from "../../enums/ApgEdr_Route_eShared.ts";
import {ApgEdr_Service_Core} from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Auth_TngResource} from "../ApgEdr_Auth_TngResource.ts";





export class ApgEdr_Dev_TngResource_Tng_Chunk

    extends ApgEdr_Auth_TngResource {

    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_Tng_Chunk.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Tng chunk",
    }
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Tng_Content_01.html"
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

        const data = Tng.ApgTng_Service.GetChunkFromCache(parseInt(rawId));

        data.content = Uts.ApgUts.EscapeHTML(data.content.toString());

        (<any>data).backLink = ApgEdr_Route_eShared.DEV_PAGE_TNG_CACHES + "#Chunk_" + data.id;

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        templateData.page.data = data;

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }





}
