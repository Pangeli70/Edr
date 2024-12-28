/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0.0 [APG 2024/10/02]
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Drash, Uts } from "../../deps.ts";
import { ApgEdr_IRequest } from "../../interfaces/ApgEdr_IRequest.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Base_TngResource } from "../ApgEdr_Base_TngResource.ts";


/**
 * General purpose abstract message or static multilangiuage page.
 */
export abstract class ApgEdr_TngResource_Message

    extends ApgEdr_Base_TngResource {

    override readonly RESOURCE_NAME = ApgEdr_TngResource_Message.name;
    abstract readonly NEXT: string;

    override readonly TNG_TEMPLATES = {
        GET: "/pages/public/" + this.RESOURCE_NAME + ".html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);

        const templateData = await this.#getTemplateData(edr);

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
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


        const r = ApgEdr_Service_Core.GetTemplateData(
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
