/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241002
 * ----------------------------------------------------------------------------
 */

import {
    Drash
} from "../../deps.ts";
import {
    ApgEdr_Route_eShared
} from "../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_IRequest
} from "../../interfaces/ApgEdr_IRequest.ts";
import {
    ApgEdr_Service
} from "../../services/ApgEdr_Service.ts";
import {
    ApgEdr_HtmlPageResource
} from "./ApgEdr_HtmlPageResource.ts";


/**
 * remark:
 * This page is meant to be used only by a response.redirect method.
 * The ApgEdr_IMessage data is supposed to be present in the Request.edr property
 */
export class ApgEdr_HtmlPageResource_Message
    extends ApgEdr_HtmlPageResource {


    override RESOURCE_NAME = ApgEdr_HtmlPageResource_Message.name;
    
    override paths = [ApgEdr_Route_eShared.PAGE_MESSAGE];

    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);

        const templateData = this.#getTemplateData(edr);

        await ApgEdr_Service.RenderPageUsingTng(
            request,
            response,
            templateData,
            {
                isCdnTemplate: true
            }
        );

    }



    #getTemplateData(aedr: ApgEdr_IRequest) {

        const { title, text, next } = ApgEdr_Service.PrepareMessage(aedr);

        const r = ApgEdr_Service.GetTemplateData(
            aedr,
            title,
            "/pages/ApgEdr_HtmlPageTemplate_Message_01.html"
        );

        r.page.data = {
            message: text,
            okLink: next
        };

        return r;
    }




}
