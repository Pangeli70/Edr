/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241002
 * ----------------------------------------------------------------------------
 */

import { Drash, Uts } from "../../deps.ts";
import { ApgEdr_IRequest } from "../../interfaces/ApgEdr_IRequest.ts";
import { ApgEdr_Service } from "../../services/ApgEdr_Service.ts";
import { ApgEdr_TngResource } from "./ApgEdr_TngResource.ts";


/**
 * General purpose abstract message or static multilangiuage page.
 */
export abstract class ApgEdr_TngResource_Message

    extends ApgEdr_TngResource {


    abstract readonly NEXT: string;

    override readonly TNG_TEMPLATES = {
        GET: "/pages/ApgEdr_HtmlPageTemplate_Language_GET_01.html",
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);

        const templateData = await this.#getTemplateData(edr);

        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
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
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        );

        r.page.data = {
            message: this.getMessage(aedr.language),
            html: await this.getHtml(aedr.language),
            okLink: this.NEXT
        };

        return r;
    }




}
