/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/07/08]
 * @version 1.0.1 [APG 2024/07/31] ApgEdr_Service.GetTemplateData
 * @version 1.0.2 [APG 2024/08/13] Moved to lib
 * @version 1.0.3 [APG 2024/09/02] Better permissions management
 * @version 1.0.4 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Drash } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_eRoute } from "../../enums/ApgEdr_eRoute.ts";
import { ApgEdr_IMessage } from "../../interfaces/ApgEdr_IMessage.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_TngResource_Auth_Base } from "../ApgEdr_TngResource_Auth_Base.ts";
import { ApgEdr_Resources_Links } from "../data/ApgEdr_Resources_Links.ts";




const NavBar = [

    ApgEdr_Resources_Links[ApgEdr_eRoute.PAGE_HOME],
    ApgEdr_Resources_Links[ApgEdr_eRoute.PAGE_MENU_DEV],

]



export class ApgEdr_Dev_TngResource_Errors

    extends ApgEdr_TngResource_Auth_Base {


    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_Errors.name;
    override readonly TITLE = "Logged errors";
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/dev/" + this.RESOURCE_NAME + ".html"
    };
    
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;

    override paths = [ApgEdr_eRoute.DEV_PAGE_ERRORS];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);

        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;


        const errors: {
            href: string;
            counter: number;
            method: string;
            route: string;
            message: ApgEdr_IMessage;
        }[] = []

        for (const error of ApgEdr_Service_Core.Errors) {

            if (!error.message) {
                error.message = {
                    title: "Error",
                    text: "No message specified for error with counterId [" + error.counter + "]",
                    next: ApgEdr_eRoute.PAGE_HOME
                }
            }

            errors.push({
                href: ApgEdr_eRoute.PAGE_ERROR + "/" + error.counter + "?FEL=1",
                counter: error.counter,
                method: error.method,
                route: error.route,
                message: error.message
            })
        }


        const templateData = ApgEdr_Service_Core.GetTngData(edr, this, 'GET');

        const topMenu = this.getTranslatedLinks(NavBar, edr.language);

        templateData.page.data = {
            topMenu,
            errors
        };


        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }


}
