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




export class ApgEdr_HtmlPageResource_Logout extends Edr.Drash.Resource {

    override paths = [Edr.ApgEdr_Route_eShared.PAGE_LOGOUT];


    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const pageData: Tng.ApgTng_IPageData = {

            microservice: {
                name: ApgEdr_Microservice.name,
                title: ApgEdr_Microservice.description,
            },

            page: {
                template: "/pages/ApgEdr_HtmlReservedPageTemplate_Logout.html",
                title: 'Log out page',
                rendered: new Date().toLocaleString(),
            },

            user: {
                role: Edr.ApgEdr_Auth_eRole.GUEST
            }
        }

        response.headers.delete('Set-Cookie');
        const cookie = Edr.ApgEdr_Auth_Service.DeleteJwtCookie();
        response.setCookie(cookie);

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, pageData, {
            isEdrSharedResource: true
        });

    }


}
