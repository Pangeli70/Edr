/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * ----------------------------------------------------------------------------
 */

import {
    ApgEdr_Microservice,
    Edr,
    Tng
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

        const pageData: Tng.ApgTng_IPageData = {

            microservice: {
                name: ApgEdr_Microservice.name,
                title: ApgEdr_Microservice.description,
            },

            page: {
                assetsHost: Edr.ApgEdr_Service.GetAssetsHost(),
                master: "/master/ApgCdn_MasterPage_Application_V01.html",
                template: "/pages/ApgEdr_HtmlPageTemplate_Error.html",
                favicon: "Apg_2024_V01",
                logoJs: "Apg_2024_V01",
                title: 'Error',
                rendered: new Date().toLocaleString(),
                data: {
                    error: loggedError?.message || "Unknown error",
                    link: ApgEdr_eRoutes.PAGE_HOME
                }
            },

            user: Edr.ApgEdr_Service.GetUserData(edr)
        }


        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, pageData, {
            isEdrSharedResource: true
        });

    }


}
