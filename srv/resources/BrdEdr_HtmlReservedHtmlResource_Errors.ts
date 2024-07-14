/** ---------------------------------------------------------------------------
 * @module [BrdEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * ----------------------------------------------------------------------------
 */

/** This import must remain here until we change the singleton pattern */

import {
    BrdEdr_Microservice,
    Edr,
    Tng
} from "../deps.ts";




export class BrdEdr_HtmlReservedPageResource_Errors extends Edr.Drash.Resource {

    override paths = [Edr.BrdEdr_Route_eShared.RESERVED_PAGE_ERRORS];

    readonly EDR_ROLE = Edr.BrdEdr_Auth_eRole.ADMIN;

    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.BrdEdr_Service.GetEdrRequest(request);
        if (!Edr.BrdEdr_Service.VerifyProtectedPage(edr, this.EDR_ROLE)) {
            this.redirect(Edr.BrdEdr_Route_eShared.PAGE_LOGIN, response);
            return;
        }

        const data: {
            counter: number;
            method: string;
            url: string;
            message: string;
        }[] = []

        for (const error of Edr.BrdEdr_Service.Errors) {

            const request = Edr.BrdEdr_Service.Requests.find(r => r.counter == error.counter)!;

            data.push({
                counter: error.counter,
                method: request.method,
                url: request.route,
                message: error.message
            })
        }

        const pageData: Tng.BrdTng_IPageData = {

            microservice: {
                name: BrdEdr_Microservice.name,
                title: BrdEdr_Microservice.description,
            }, 

            page: {
                template: "/pages/BrdEdr_HtmlReservedPageTemplate_Errors.html",
                title: 'Errors',
                rendered: new Date().toLocaleString(),
                data
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
