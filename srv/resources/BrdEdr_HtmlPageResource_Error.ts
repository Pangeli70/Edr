/** ---------------------------------------------------------------------------
 * @module [BrdEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * ----------------------------------------------------------------------------
 */

import {
    BrdEdr_Microservice,
    Edr,
    Tng
} from "../deps.ts";
import {
    BrdEdr_eRoutes
} from "../enums/BrdEdr_eRoute.ts";




export class BrdEdr_HtmlPageResource_Error extends Edr.Drash.Resource {

    override paths = [BrdEdr_eRoutes.PAGE_ERROR];
    readonly ERROR_COUNTER_PARAM_ID = 'id';

    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const rawId = request.pathParam(this.ERROR_COUNTER_PARAM_ID);
        const counter = parseInt(rawId!);
        const loggedError = Edr.BrdEdr_Service.Errors.find(r => r.counter == counter);

        const pageData: Tng.BrdTng_IPageData = {

            microservice: {
                name: BrdEdr_Microservice.name,
                title: BrdEdr_Microservice.description,
            },

            page: {
                template: "/pages/BrdEdr_HtmlPageTemplate_Error.html",
                title: 'Error',
                rendered:new Date().toLocaleString(),
                data: {
                    error: loggedError?.message || "Unknown error",
                    link: BrdEdr_eRoutes.PAGE_HOME
                }
            },
            
            user: {
                role: Edr.BrdEdr_Auth_eRole.GUEST
            }
        }



        await Edr.BrdEdr_Service.RenderPageUsingBrdTng(request, response, pageData, true);

    }


}
