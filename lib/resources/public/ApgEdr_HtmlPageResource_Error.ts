/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * ----------------------------------------------------------------------------
 */

import {
    Drash,
    Uts,
} from "../../deps.ts";
import {
    ApgEdr_Route_eShared
} from "../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_IRequest
} from "../../interfaces/ApgEdr_IRequest.ts";
import { ApgEdr_Log_Service } from "../../services/ApgEdr_Log_Service.ts";
import {
    ApgEdr_Service
} from "../../services/ApgEdr_Service.ts";
import {
    ApgEdr_HtmlPageResource
} from "./ApgEdr_HtmlPageResource.ts";



export class ApgEdr_HtmlPageResource_Error

    extends ApgEdr_HtmlPageResource {


    override readonly RESOURCE_NAME = ApgEdr_HtmlPageResource_Error.name;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/ApgEdr_HtmlPageTemplate_Error_01.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly PATH_PARAM_ERR_ID = 'counter';

    readonly QS_PARAM_FROM_ERRORS_LIST = 'FEL';

    override paths = [ApgEdr_Route_eShared.PAGE_ERROR + "/:" + this.PATH_PARAM_ERR_ID];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);

        const rawErrId = request.pathParam(this.PATH_PARAM_ERR_ID);

        const isFromErrorsList = request.queryParam(this.QS_PARAM_FROM_ERRORS_LIST) == '1';

        if (Uts.ApgUts_Is.IsInteger(rawErrId)) {
            const errId = parseInt(rawErrId!);
            const edrWithError = ApgEdr_Log_Service.RetriveEdrByCallId(errId);
            if (edrWithError) {
                edr.message = edrWithError.message;
            }
        }

        const templateData = this.#getTemplateData(edr, isFromErrorsList);

        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }


    #getTemplateData(
        aedr: ApgEdr_IRequest,
        aisFromErrorsList: boolean
    ) {

        if (!aedr.message) {
            aedr.message = {
                title: "Error",
                text: "The redirect to this error page does not have a message",
                next: ApgEdr_Route_eShared.PAGE_HOME
            }
            ApgEdr_Service.Errors.push(aedr)
        }

        const { title, text, next } = ApgEdr_Service.PrepareMessageFromEdr(aedr);

        const r = ApgEdr_Service.GetTemplateData(
            aedr,
            title,
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        );

        r.page.data = {
            message: text,
            okLink: aisFromErrorsList ? ApgEdr_Route_eShared.RESERVED_PAGE_ERRORS : next
        }

        return r;
    }


}
