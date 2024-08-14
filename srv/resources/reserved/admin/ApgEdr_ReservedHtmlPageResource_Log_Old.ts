/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * ----------------------------------------------------------------------------
 */

/** This import must remain here until we change the singleton pattern */

import {
    Edr
} from "../../../deps.ts";




export class ApgEdr_ReservedHtmlPageResource_Log extends Edr.Drash.Resource {

    override paths = [Edr.ApgEdr_Route_eShared.RESERVED_PAGE_LOG];

    readonly EDR_ROLE = Edr.ApgEdr_Auth_eRole.ADMIN;

    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.ApgEdr_Service.GetEdrRequest(request);
        if (!Edr.ApgEdr_Service.VerifyProtectedPage(edr, this.EDR_ROLE)) {
            this.redirect(Edr.ApgEdr_Route_eShared.PAGE_LOGIN, response);
            return;
        }

        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'Log',
            "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Log.html",
        )

        templateData.page.data = {
            entryRoute: Edr.ApgEdr_Route_eShared.RESERVED_PAGE_LOG_ENTRY,
            requests: Edr.ApgEdr_Service.Requests
        }

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData, {
            isCdnResource: true
        });
    }





}
