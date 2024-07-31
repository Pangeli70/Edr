/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * ----------------------------------------------------------------------------
 */

import {
    Edr
} from "../deps.ts";
import {
    ApgEdr_eRoutes
} from "../enums/ApgEdr_eRoute.ts";



export class ApgEdr_HtmlPageResource_Error extends Edr.Drash.Resource {

    readonly PATH_PARAM_ID = 'id';

    override paths = [Edr.ApgEdr_Route_eShared.PAGE_ERROR + '/:' + this.PATH_PARAM_ID];

    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.ApgEdr_Service.GetEdrRequest(request);

        const rawId = request.pathParam(this.PATH_PARAM_ID);
        let counter = parseInt(rawId!);


        if (!counter) {
            const edr = Edr.ApgEdr_Service.GetEdrRequest(request);
            counter = edr.counter;
            Edr.ApgEdr_Service.Errors.push({
                counter,
                message: "No error id specified"
            })
        }

        const loggedError = Edr.ApgEdr_Service.Errors.find(r => r.counter == counter);

        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'Error',
            "/pages/ApgEdr_HtmlPageTemplate_Error.html",
        );

        templateData.page.data = {
            error: loggedError?.message || "Unknown error",
            okLink: ApgEdr_eRoutes.PAGE_HOME
        }

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData, {
            isEdrSharedResource: true
        });

    }


}
