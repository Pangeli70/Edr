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





export class ApgEdr_ReservedHtmlPageResource_Tng_Chunk
    extends ApgEdr_ReservedHtmlPageResource {

    readonly PATH_PARAM_ID = 'id'

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_TNG_CHUNK + "/:" + this.PATH_PARAM_ID];

    override readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;
    override readonly RESOURCE_NAME = ApgEdr_ReservedHtmlPageResource_Tng_Chunk.name;

    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdrRequest(request);
        if (!this.verifyPermissions(this.GET, request, response, edr)) return;

        const rawId = request.pathParam(this.PATH_PARAM_ID)!;

        const data = Tng.ApgTng_Service.GetChunkFromCache(parseInt(rawId));

        data.content = Uts.ApgUts.EscapeHTML(data.content.toString());

        (<any>data).backLink = ApgEdr_Route_eShared.RESERVED_PAGE_TNG_CACHES + "#Chunk_" + data.id;

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Tng chunk',
            "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Tng_Content_01.html",
        )

        templateData.page.data = data;

        await ApgEdr_Service.RenderPageUsingTng(
            request,
            response,
            templateData,
            {
                isCdnTemplate: true
            }
        );
    }





}
