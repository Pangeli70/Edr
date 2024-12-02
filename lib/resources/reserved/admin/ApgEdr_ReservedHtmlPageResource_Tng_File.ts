/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240728
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * @version 1.3 APG 20240902 Better permissions management
 * ----------------------------------------------------------------------------
 */


import {
    Drash, Tng, Uts
} from "../../../deps.ts";
import {
    ApgEdr_Auth_eRole
} from "../../../enums/ApgEdr_Auth_eRole.ts";
import {
    ApgEdr_Route_eShared
} from "../../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_Service
} from "../../../services/ApgEdr_Service.ts";
import {
    ApgEdr_ReservedHtmlPageResource
} from "../ApgEdr_ReservedHtmlPageResource.ts";




export class ApgEdr_ReservedHtmlPageResource_Tng_File

    extends ApgEdr_ReservedHtmlPageResource {


    override readonly RESOURCE_NAME = ApgEdr_ReservedHtmlPageResource_Tng_File.name;
    override readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Tng_Content_01.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly PATH_PARAM_ID = 'id'

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_TNG_FILE + "/:" + this.PATH_PARAM_ID];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const rawId = request.pathParam(this.PATH_PARAM_ID)!;

        const data = Tng.ApgTng_Service.GetFileFromCache(rawId);

        data.content = Uts.ApgUts.EscapeHTML(data.content);

        (<any>data).backLink = ApgEdr_Route_eShared.RESERVED_PAGE_TNG_CACHES + "#File_" + data.id;

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Tng file',
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        templateData.page.data = data;


        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }





}
