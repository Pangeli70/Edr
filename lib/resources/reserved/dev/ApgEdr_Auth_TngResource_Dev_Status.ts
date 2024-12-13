/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241023
 * ----------------------------------------------------------------------------
*/


import { Drash, Mng, Tng, Uts } from "../../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Dev_Service } from "../../../services/ApgEdr_Dev_Service.ts";
import { ApgEdr_ResendMail_Service } from "../../../services/ApgEdr_Mail_Service.ts";
import { ApgEdr_Service } from "../../../services/ApgEdr_Service.ts";
import { ApgEdr_Telemetry_Service } from "../../../services/ApgEdr_Telemetry_Service.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";



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



export class ApgEdr_Auth_TngResource_Status

    extends ApgEdr_Auth_TngResource {


    override readonly RESOURCE_NAME = ApgEdr_Auth_TngResource_Status.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Events for the service",
    }
    override readonly EDR_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Status_01.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly QS_PARAM_TYPE = 'type';

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_STATUS];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        let type = request.queryParam(this.QS_PARAM_TYPE) as ApgEdr_eService;
        if (!type) {
            type = ApgEdr_eService.MONGO;
        }

        const serviceEvents = this.#getEvents(type);


        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        templateData.page.data = {
            url: ApgEdr_Route_eShared.RESERVED_PAGE_STATUS,
            type,
            services,
            events: serviceEvents
        }

        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }


    #getEvents(type: ApgEdr_eService) {

        switch (type) {
            case ApgEdr_eService.MONGO:
                return Mng.ApgMng_Service.Events;
            case ApgEdr_eService.EMAIL:
                return ApgEdr_ResendMail_Service.Events;
            case ApgEdr_eService.TENGINE:
                return Tng.ApgTng_Service.Events;
            case ApgEdr_eService.TELEMETRY:
                return ApgEdr_Telemetry_Service.Events;
            case ApgEdr_eService.DEV:
                return ApgEdr_Dev_Service.Events;
            case ApgEdr_eService.AUTH:
                return ApgEdr_Service.Events;
            default:
                return [];
        }

    }





}
