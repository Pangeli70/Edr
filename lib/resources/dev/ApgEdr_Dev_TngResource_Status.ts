/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/10/23]
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
*/


import { Drash, Mng, Tng, Uts } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Service_DevStories } from "../../services/ApgEdr_Service_DevStories.ts";
import { ApgEdr_Service_ResendMail } from "../../services/ApgEdr_Service_ResendMail.ts";
import { ApgEdr_Service_Telemetry } from "../../services/ApgEdr_Service_Telemetry.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";
import { ApgEdr_Shared_Links } from "../data/ApgEdr_Resources_Links.ts";



const NavBar = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_HOME],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_DEV],

]


enum ApgEdr_eService {

    MONGO = "mongo",
    EMAIL = "email",
    TENGINE = "tengine",
    TELEMETRY = "telemetry",
    DEV = "dev",
    AUTH = "auth",
}

const services = {
    [ApgEdr_eService.MONGO]: "Mng Service",
    [ApgEdr_eService.EMAIL]: "Email Service",
    [ApgEdr_eService.TENGINE]: "Tng Service",
    [ApgEdr_eService.TELEMETRY]: "Telemetry service",
    [ApgEdr_eService.DEV]: "Dev Service",
    [ApgEdr_eService.AUTH]: "Auth Service",
}



export class ApgEdr_Dev_TngResource_Status

    extends ApgEdr_Auth_TngResource {


    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_Status.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Events of the services",
    }
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/dev/" + this.RESOURCE_NAME + ".html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly QS_PARAM_TYPE = 'type';

    override paths = [ApgEdr_Route_eShared.DEV_PAGE_STATUS];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        let type = request.queryParam(this.QS_PARAM_TYPE) as ApgEdr_eService;
        if (!type) {
            type = ApgEdr_eService.MONGO;
        }

        const serviceEvents = this.#getEvents(type);


        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const topMenu = this.getTranslatedLinks(NavBar, edr.language);

        templateData.page.data = {
            topMenu,
            url: ApgEdr_Route_eShared.DEV_PAGE_STATUS,
            type,
            services,
            events: serviceEvents
        }

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }


    #getEvents(type: ApgEdr_eService) {

        switch (type) {
            case ApgEdr_eService.MONGO:
                return Mng.ApgMng_Service.Events;
            case ApgEdr_eService.EMAIL:
                return ApgEdr_Service_ResendMail.Events;
            case ApgEdr_eService.TENGINE:
                return Tng.ApgTng_Service.Events;
            case ApgEdr_eService.TELEMETRY:
                return ApgEdr_Service_Telemetry.Events;
            case ApgEdr_eService.DEV:
                return ApgEdr_Service_DevStories.Events;
            case ApgEdr_eService.AUTH:
                return ApgEdr_Service_Core.Events;
            default:
                return [];
        }

    }





}
