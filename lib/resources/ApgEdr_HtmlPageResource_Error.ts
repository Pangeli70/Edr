/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * ----------------------------------------------------------------------------
 */

import {
    Drash
} from "../deps.ts";
import {
    ApgEdr_Route_eShared
} from "../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_Service
} from "../services/ApgEdr_Service.ts";



export class ApgEdr_HtmlPageResource_Error extends Drash.Resource {

    readonly PATH_PARAM_ID = 'id';

    override paths = [ApgEdr_Route_eShared.PAGE_ERROR + '/:' + this.PATH_PARAM_ID];

    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdrRequest(request);

        const rawId = request.pathParam(this.PATH_PARAM_ID);
        let counter = parseInt(rawId!);


        if (!counter) {
            counter = edr.counter;
            ApgEdr_Service.Errors.push({
                counter,
                message: "No error id specified",
                redirectUrl: ApgEdr_Route_eShared.PAGE_HOME
            })
        }

        let loggedError = ApgEdr_Service.Errors.find(r => r.counter == counter);

        if (!loggedError) {
            loggedError = {
                counter,
                message: "Error with id [" + counter + "] not found",
                redirectUrl: ApgEdr_Route_eShared.PAGE_HOME
            }
            ApgEdr_Service.Errors.push(loggedError);
        }

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Error',
            "/pages/ApgEdr_HtmlPageTemplate_Error_01.html",
        );

        templateData.page.data = {
            error: loggedError?.message || "Unknown error",
            okLink: loggedError?.redirectUrl || ApgEdr_Route_eShared.PAGE_HOME
        }

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
