/** ---------------------------------------------------------------------------
 * @module [BrdEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * ----------------------------------------------------------------------------
 */

import {
    BrdEdr_Microservice,
    Edr, Tng
} from "../deps.ts";
import {
    BrdEdr_eRoutes
} from "../enums/BrdEdr_eRoute.ts";



export class BrdEdr_HtmlReservedPageResource_LogEntry extends Edr.Drash.Resource {

    override paths = [BrdEdr_eRoutes.RESERVED_PAGE_LOG_ENTRY];

    readonly EDR_ROLE = Edr.BrdEdr_Auth_eRole.ADMIN;
    readonly PATH_PARAM_ID = 'id';

    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.BrdEdr_Service.GetEdrRequest(request);
        if (!Edr.BrdEdr_Service.VerifyProtectedPage(edr, this.EDR_ROLE)) {
            this.redirect(BrdEdr_eRoutes.PAGE_LOGIN, response);
            return;
        }

        const rawId = request.pathParam(this.PATH_PARAM_ID);
        const counter = parseInt(rawId!);
        const loggedRequest = Edr.BrdEdr_Log_Service.Requests.find(r => r.counter == counter);

        if (!loggedRequest) { 
            const message = "Request with id " + rawId + " not found";
            Edr.BrdEdr_Service.Errors.push({
                counter: edr.counter,
                message
            })
            const url = BrdEdr_eRoutes.PAGE_ERROR.replace(":" +this.PATH_PARAM_ID, edr.counter.toString());
            this.redirect(url, response)
            return;
        }

        const pageData: Tng.BrdTng_IPageData = {

            microservice: {
                name: BrdEdr_Microservice.name,
                title: BrdEdr_Microservice.description,
            },

            page: {
                template: "/pages/BrdEdr_HtmlReservedPageTemplate_LogEntry.html",
                title: 'Logged request',
                rendered: new Date().toLocaleString(),
                data: loggedRequest
            },

            user: {
                email: edr.auth!.email,
                role: edr.auth!.role
            }
        }

        await Edr.BrdEdr_Service.RenderPageUsingBrdTng(request, response, pageData, true);
    }





}
