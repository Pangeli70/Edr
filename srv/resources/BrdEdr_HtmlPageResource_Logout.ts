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




export class BrdEdr_HtmlPageResource_Logout extends Edr.Drash.Resource {

    override paths = [BrdEdr_eRoutes.PAGE_LOGOUT];


    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const pageData: Tng.BrdTng_IPageData = {

            microservice: {
                name: BrdEdr_Microservice.name,
                title: BrdEdr_Microservice.description,
            },

            page: {
                template: "/pages/BrdEdr_HtmlReservedPageTemplate_Logout.html",
                title: 'Log out page',
                rendered: new Date().toLocaleString(),
            },
            
            user: {
                role: Edr.BrdEdr_Auth_eRole.GUEST
            }
        }

        response.headers.delete('Set-Cookie');
        const cookie = Edr.BrdEdr_Auth_Service.DeleteJwtCookie();
        response.setCookie(cookie);

        await Edr.BrdEdr_Service.RenderPageUsingBrdTng(request, response, pageData, true);

    }


}
