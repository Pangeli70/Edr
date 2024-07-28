/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * ----------------------------------------------------------------------------
 */

/** This import must remain here until we change the singleton pattern */

import {
    ApgEdr_Microservice,
    Edr,
    Tng
} from "../deps.ts";




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

        const pageData: Tng.ApgTng_IPageData = {

            microservice: {
                name: ApgEdr_Microservice.name,
                title: ApgEdr_Microservice.description,
            },

            page: {
                assetsHost: Edr.ApgEdr_Service.GetAssetsHost(),
                master: "/master/ApgCdn_MasterPage_Application_V01.html",
                template: "/pages/ApgEdr_ReservedHtmlPageTemplate_Log.html",
                favicon: "Apg_2024_V01",
                logoJs: "Apg_2024_V01",
                title: 'Log',
                rendered: new Date().toLocaleString(),
                data: {
                    route: Edr.ApgEdr_Route_eShared.RESERVED_PAGE_LOG_ENTRY,
                    requests: Edr.ApgEdr_Service.Requests
                }
            },

            user: Edr.ApgEdr_Service.GetUserData(edr)
        }

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, pageData, {
            isEdrSharedResource: true
        });
    }





}
