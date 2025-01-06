/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/11/08] Extracted from Home resource
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Drash, Tng, Uts } from "../deps.ts";
import { ApgEdr_Service_Core } from "../services/ApgEdr_Service_Core.ts";
import { ApgEdr_TngResource_Auth_Base } from "./ApgEdr_TngResource_Auth_Base.ts";



export abstract class ApgEdr_TngResource_Menu_Base

    extends ApgEdr_TngResource_Auth_Base {


    override readonly RESOURCE_NAME = ApgEdr_TngResource_Menu_Base.name;
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/public/" + this.RESOURCE_NAME + ".html"
    };

    /**
      * Abstract properties Must be overridden by subclasses
      */
    abstract readonly MENU: Tng.ApgTng_IHyperlink[];
    abstract readonly TOP_MENU: Tng.ApgTng_IHyperlink[];


    /**
     * Override this method to get a multilanguage page title for a menu page
     */
    protected getPageTitle(_alang: Uts.ApgUts_TLanguage) {
        return this.TITLE;
    }



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const title = this.getPageTitle(edr.language);

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            title,
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        );

        const menuFiltered = ApgEdr_Service_Core.FilterLinksByRole(edr, this.MENU);
        const menu = this.getTranslatedLinks(menuFiltered, edr.language);

        const topMenu = this.getTranslatedLinks(this.TOP_MENU, edr.language);

        templateData.page.data = {
            menu,
            topMenu
        };


        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }



}
