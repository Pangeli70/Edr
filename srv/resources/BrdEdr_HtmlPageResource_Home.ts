/** ---------------------------------------------------------------------------
 * @module [BrdEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240701 Cleanup and alignment to BrdCdn
 * ----------------------------------------------------------------------------
 */

import {
    BrdEdr_MainMenu
} from "../data/BrdEdr_MainMenu.ts";
import {
    BrdEdr_Microservice,
    Edr, Tng
} from "../deps.ts";
import {
    BrdEdr_eRoutes
} from "../enums/BrdEdr_eRoute.ts";



export class BrdEdr_HtmlPageResource_Home extends Edr.Drash.Resource {

    override paths = ["/", BrdEdr_eRoutes.PAGE_HOME];



    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.BrdEdr_Service.GetEdrRequest(request);

        const pageData: Tng.BrdTng_IPageData = {

            microservice: {
                name: BrdEdr_Microservice.name,
                title: BrdEdr_Microservice.description,
            },

            page: {
                template: "/pages/BrdEdr_HtmlPageTemplate_Home.html",
                title: 'Home page',
                rendered: new Date().toLocaleString(),
                data: {
                    links: BrdEdr_MainMenu,
                    lang: "EN"
                },
            },

            user: {
                email: edr.auth?.email || "",
                role: edr.auth?.role || Edr.BrdEdr_Auth_eRole.GUEST
            }
        }

        await Edr.BrdEdr_Service.RenderPageUsingBrdTng(request, response, pageData);
    }



}
