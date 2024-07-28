/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * ----------------------------------------------------------------------------
 */

import {
    ApgEdr_Microservice,
    Edr, Tng
} from "../deps.ts";




export class ApgEdr_ReservedHtmlPageResource_LogEntry extends Edr.Drash.Resource {

    readonly PATH_PARAM_ID = 'id';
    
    readonly EDR_ROLE = Edr.ApgEdr_Auth_eRole.ADMIN;


    override paths = [Edr.ApgEdr_Route_eShared.RESERVED_PAGE_LOG_ENTRY + "/:" + this.PATH_PARAM_ID];


    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.ApgEdr_Service.GetEdrRequest(request);
        if (!Edr.ApgEdr_Service.VerifyProtectedPage(edr, this.EDR_ROLE)) {
            this.redirect(Edr.ApgEdr_Route_eShared.PAGE_LOGIN, response);
            return;
        }

        const rawId = request.pathParam(this.PATH_PARAM_ID);
        const counter = parseInt(rawId!);
        const loggedRequest = Edr.ApgEdr_Service.Requests.find(r => r.counter == counter);

        if (!loggedRequest) {
            const message = "Request with id " + rawId + " not found";
            const url = Edr.ApgEdr_Route_eShared.PAGE_ERROR.replace(":" + this.PATH_PARAM_ID, edr.counter.toString());
            Edr.ApgEdr_Service.Error(this, response, edr, message, url);
            return;
        }

        const pageData: Tng.ApgTng_IPageData = {

            microservice: {
                name: ApgEdr_Microservice.name,
                title: ApgEdr_Microservice.description,
            },

            page: {
                assetsHost: Edr.ApgEdr_Service.GetAssetsHost(),
                master: "/master/ApgCdn_MasterPage_Application_V01.html",
                template: "/pages/ApgEdr_ReservedHtmlPageTemplate_LogEntry.html",
                favicon: "Apg_2024_V01",
                logoJs: "Apg_2024_V01",
                title: 'Logged request',
                rendered: new Date().toLocaleString(),
                data: loggedRequest
            },

            user: Edr.ApgEdr_Service.GetUserData(edr)
        }

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, pageData, {
            isEdrSharedResource: true
        });
    }



}
