/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * ----------------------------------------------------------------------------
 */

import {
    Edr
} from "../../../deps.ts";




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
            const errorPage = Edr.ApgEdr_Route_eShared.PAGE_ERROR + "/" +  edr.counter.toString();
            Edr.ApgEdr_Service.Error(this, response, edr, message, errorPage);
            return;
        }

        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'Logged request',
            "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_LogEntry.html",
        )

        // templateData.page.noCache = true;

        templateData.page.data = {
            logRoute: Edr.ApgEdr_Route_eShared.RESERVED_PAGE_LOG,
            request: loggedRequest
        }


        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData, {
            isCdnResource: true
        });
    }



}
