/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * ----------------------------------------------------------------------------
 */

/** This import must remain here until we change the singleton pattern */

import {
    Edr,
    Tng
} from "../deps.ts";




export class ApgEdr_ReservedHtmlPageResource_Errors extends Edr.Drash.Resource {

    override paths = [Edr.ApgEdr_Route_eShared.RESERVED_PAGE_ERRORS];

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

        const data: {
            counter: number;
            method: string;
            url: string;
            message: string;
        }[] = []

        for (const error of Edr.ApgEdr_Service.Errors) {

            const request = Edr.ApgEdr_Service.Requests.find(r => r.counter == error.counter)!;

            data.push({
                counter: error.counter,
                method: request.method,
                url: request.route,
                message: error.message
            })
        }

        const pageData: Tng.ApgTng_IPageData = {

            microservice: {
                name: Edr.ApgEdr_Service.Microservice.name,
                title: Edr.ApgEdr_Service.Microservice.description,
            }, 

            page: {
                assetsHost: Edr.ApgEdr_Service.GetAssetsHost(),
                master: "/master/ApgCdn_MasterPage_Application_V01.html",
                template: "/pages/ApgEdr_ReservedHtmlPageTemplate_Errors.html",
                favicon: "Apg_2024_V01",
                logoJs: "Apg_2024_V01",
                title: 'Errors',
                rendered: new Date().toLocaleString(),
                data
            },

            user: Edr.ApgEdr_Service.GetUserData(edr)
        }

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, pageData, {
            isEdrSharedResource: true
        });
    }





}
