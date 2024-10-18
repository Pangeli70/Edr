/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240701 Cleanup
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240814 ApgEdr_Service.FilterLinksByLogin + MainMenu_01 template
 * ----------------------------------------------------------------------------
 */


import {
    ApgEdr_Menu_Main
} from "../data/ApgEdr_Menu_Main.ts";
import {
    Edr
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


        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'Home page',
            "/pages/ApgEdr_HtmlPageTemplate_MainMenu_01.html"
        );


        const isLoggedIn = templateData.user.role != Edr.ApgEdr_Auth_eRole.ANONYMOUS;

        const links = Edr.ApgEdr_Service.FilterLinksByLogin(ApgEdr_Menu_Main, isLoggedIn);
        templateData.page.data = { links };

        templateData.page.translations = {
            intro: {
                EN: "This site is used to test the ApgEdr library and give some advice about microservices development",
                IT: "Questo sito è usato per testare la libreria ApgEdr e dare alcuni consigli su come sviluppare i microservizi"
            }
        }

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData);
    }



}
