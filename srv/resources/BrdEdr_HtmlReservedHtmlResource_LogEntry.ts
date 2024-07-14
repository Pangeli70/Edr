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




export class BrdEdr_HtmlReservedPageResource_LogEntry extends Edr.Drash.Resource {

    override paths = [Edr.BrdEdr_Route_eShared.RESERVED_PAGE_LOG_ENTRY];

    readonly EDR_ROLE = Edr.BrdEdr_Auth_eRole.ADMIN;
    readonly PATH_PARAM_ID = 'id';

    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.BrdEdr_Service.GetEdrRequest(request);
        if (!Edr.BrdEdr_Service.VerifyProtectedPage(edr, this.EDR_ROLE)) {
            this.redirect(Edr.BrdEdr_Route_eShared.PAGE_LOGIN, response);
            return;
        }

        const rawId = request.pathParam(this.PATH_PARAM_ID);
        const counter = parseInt(rawId!);
        const loggedRequest = Edr.BrdEdr_Service.Requests.find(r => r.counter == counter);

        if (!loggedRequest) {
            const message = "Request with id " + rawId + " not found";
            const url = Edr.BrdEdr_Route_eShared.PAGE_ERROR.replace(":" + this.PATH_PARAM_ID, edr.counter.toString());
            Edr.BrdEdr_Service.Error(this, response, edr, message, url);
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

        await Edr.BrdEdr_Service.RenderPageUsingBrdTng(request, response, pageData, {
            isEdrSharedResource: true
        });
    }



}
