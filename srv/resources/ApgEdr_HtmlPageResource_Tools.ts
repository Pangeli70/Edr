/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240701 Cleanup and alignment to ApgCdn
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * ----------------------------------------------------------------------------
 */

import {
    Edr
} from "../deps.ts";




export class ApgEdr_HtmlPageResource_Tools extends Edr.Drash.Resource {

    override paths = [Edr.ApgEdr_Route_eShared.PAGE_TOOLS];

    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.ApgEdr_Service.GetEdrRequest(request);

        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'Development tools',
            "/pages/ApgEdr_HtmlPageTemplate_Tools.html",
        )

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData, {
            isCdnResource: true
        });
    }
}
