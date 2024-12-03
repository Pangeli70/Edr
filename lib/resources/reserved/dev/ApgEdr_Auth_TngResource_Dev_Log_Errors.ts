/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * @version 1.3 APG 20240902 Better permissions management
 * ----------------------------------------------------------------------------
 */


import { Drash, Uts } from "../../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_IMessage } from "../../../interfaces/ApgEdr_IMessage.ts";
import { ApgEdr_Service } from "../../../services/ApgEdr_Service.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";




export class ApgEdr_Auth_TngResource_Log_Errors

    extends ApgEdr_Auth_TngResource {


    override readonly RESOURCE_NAME = ApgEdr_Auth_TngResource_Log_Errors.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Logged errors",
    }
    override readonly EDR_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Errors_01.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_ERRORS];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const data: {
            href: string;
            counter: number;
            method: string;
            route: string;
            message: ApgEdr_IMessage;
        }[] = []

        for (const error of ApgEdr_Service.Errors) {

            if (!error.message) {
                error.message = {
                    title: "Error",
                    text: "No message specified for error with counterId [" + error.counter + "]",
                    next: ApgEdr_Route_eShared.PAGE_HOME
                }
            }

            data.push({
                href: ApgEdr_Route_eShared.PAGE_ERROR + "/" + error.counter + "?FEL=1",
                counter: error.counter,
                method: error.method,
                route: error.route,
                message: error.message
            })
        }


        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        templateData.page.data = data;


        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }


}
