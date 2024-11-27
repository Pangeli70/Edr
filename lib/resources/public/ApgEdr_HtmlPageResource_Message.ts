/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241002
 * ----------------------------------------------------------------------------
 */

import {
    Drash, Uts
} from "../../deps.ts";
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
 * General purpose abstract message or static multilangiuage page.
 */
export abstract class ApgEdr_HtmlPageResource_Message
    extends ApgEdr_HtmlPageResource {

    abstract readonly NEXT: string;
    abstract readonly TITLE: Uts.ApgUts_IMultilanguage;

    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);

        const templateData = await this.#getTemplateData(edr);

        await ApgEdr_Service.RenderPageUsingTng(
            request,
            response,
            templateData,
            {
                isCdnTemplate: true
            }
        );

    }



    /**
     * Virtual method
     * Get a message to display a single paragraph in the page
     */
    protected getMessage(_alanguage: Uts.ApgUts_TLanguage) { 
        return "";
    }


    
    /**
     * Virtual method
     * Get chunk of HTML to display in the page
     */
    protected async getHtml(_alanguage: Uts.ApgUts_TLanguage) {
        return await new Promise<string>((resolve) => resolve(""));
    }



    async #getTemplateData(aedr: ApgEdr_IRequest) {


        const r = ApgEdr_Service.GetTemplateData(
            aedr,
            Uts.ApgUts_Translator.Translate(this.TITLE, aedr.language),
            "/pages/ApgEdr_HtmlPageTemplate_Message_GET_01.html"
        );

        r.page.data = {
            message: this.getMessage(aedr.language),
            html: await this.getHtml(aedr.language),
            okLink: this.NEXT
        };

        return r;
    }




}
