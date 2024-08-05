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


        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'Home page',
            "/pages/ApgEdr_HtmlPageTemplate_Home.html"
        );


        const isLoggedIn = templateData.user.role != Edr.ApgEdr_Auth_eRole.GUEST;

        templateData.page.data = {
            links: ApgEdr_MainMenu.filter(a => (a.reserved == false) || (a.reserved == isLoggedIn)),
        };

        templateData.page.translations = {
            intro: {
                EN: "This site is used to test the ApgEdr library and give some advice about microservices development",
                IT: "Questo sito è usato per testare la libreria ApgEdr e dare alcuni consigli su come sviluppare i microservizi"
            }
        }

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData);
    }



}
