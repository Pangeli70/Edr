/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240701 Cleanup and alignment to ApgCdn
 * ----------------------------------------------------------------------------
 */

import {
    ApgEdr_MainMenu
} from "../data/ApgEdr_MainMenu.ts";
import {
    ApgEdr_Microservice,
    Edr, Tng
} from "../deps.ts";
import {
    ApgEdr_eRoutes
} from "../enums/ApgEdr_eRoute.ts";



export class ApgEdr_HtmlPageResource_Home extends Edr.Drash.Resource {

    override paths = ["/", ApgEdr_eRoutes.PAGE_HOME];



    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.ApgEdr_Service.GetEdrRequest(request);


        // INFO: The following is only for testing purposes of the master page
        const rawEnv = request.queryParam('env')
        const favicon = rawEnv == "Brd" ? "Breda_2024_V01" : "Apg_2024_V01";
        const logoJs = rawEnv == "Brd" ? "Breda_2024_V01" : "Apg_2024_V01";



        const pageData: Tng.ApgTng_IPageData = {

            microservice: {
                name: ApgEdr_Microservice.name,
                title: ApgEdr_Microservice.description,
            },

            page: {
                assetsHost: Edr.ApgEdr_Service.GetAssetsHost(),
                master: "/master/ApgCdn_MasterPage_Application_V01.html",
                template: "/pages/ApgEdr_HtmlPageTemplate_Home.html",
                favicon,
                logoJs,
                title: 'Home page',
                rendered: new Date().toLocaleString(),
                data: {
                    links: ApgEdr_MainMenu,
                    lang: edr.language,
                    intro: this.#getIntro(edr.language)
                },
            },

            user: Edr.ApgEdr_Service.GetUserData(edr)
        }

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, pageData);
    }


    #getIntro(alang: string) {
        
        switch (alang) {
            case "IT":
                return "Questo sito è usato per testare la libreria ApgEdr e dare alcuni consigli su come sviluppare i microservizi";
            default:
                return "This site is used to test the ApgEdr library and give some advice about microservices development";
        }


    }


}
