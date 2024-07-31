/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240701 Cleanup and alignment to ApgCdn
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * ----------------------------------------------------------------------------
 */


import {
    ApgEdr_MainMenu
} from "../data/ApgEdr_MainMenu.ts";
import {
    Edr, Tng
} from "../deps.ts";
import {
    ApgEdr_eRoutes
} from "../enums/ApgEdr_eRoute.ts";
import {
    Uts
} from "../monorepo.ts";



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


        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'Home page',
            "/pages/ApgEdr_HtmlPageTemplate_Home.html"
        );

        templateData.page.data = {
            links: ApgEdr_MainMenu,
        };

        templateData.page.translations = {
            intro: {
                EN: "This site is used to test the ApgEdr library and give some advice about microservices development",
                IT: "Questo sito è usato per testare la libreria ApgEdr e dare alcuni consigli su come sviluppare i microservizi"
            }
        }

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData);
    }



    private GetTemplateData(
        edr: Edr.ApgEdr_IRequest,
        atitle: string,
        atemplate: string,
        alang: Uts.ApgUts_TLanguage = 'EN'
    ): Tng.ApgTng_IPageData {

        return {

            microservice: {
                name: Edr.ApgEdr_Service.Microservice.name,
                title: Edr.ApgEdr_Service.Microservice.description,
            },

            page: {
                assetsHost: Edr.ApgEdr_Service.GetAssetsHost(),
                master: Edr.ApgEdr_Service.DefaultMaster,
                favicon: Edr.ApgEdr_Service.DefaultFavicon,
                logoJs: Edr.ApgEdr_Service.DefaultLogoJs,
                template: atemplate,
                title: atitle,
                lang: alang,
                rendered: new Date().toLocaleString(),
                data: {},
                translations: {}
            },

            user: Edr.ApgEdr_Service.GetUserData(edr)
        };
    }




}
