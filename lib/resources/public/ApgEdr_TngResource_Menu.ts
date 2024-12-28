/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0.0 [APG 2024/11/08] Extracted from Home resource
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Drash, Tng, Uts } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Base_TngResource } from "../ApgEdr_Base_TngResource.ts";



export abstract class ApgEdr_TngResource_Menu

    extends ApgEdr_Base_TngResource {

    readonly RESOURCE_NAME = ApgEdr_TngResource_Menu.name;
    
    /**
      * Abstract properties Must be overridden by subclasses
      */
    abstract readonly MENU: Tng.ApgTng_IHyperlink[];
    abstract readonly TOP_MENU: Tng.ApgTng_IHyperlink[];

    override readonly TNG_TEMPLATES = {
        GET: "/pages/public/" + this.RESOURCE_NAME + ".html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;


    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);

        const title = Uts.ApgUts_Translator.Translate(
            this.TITLE,
            edr.language
        );

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            title,
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        );

        const isLoggedIn = templateData.user.role != ApgEdr_Auth_eRole.ANONYMOUS;

        const menuFiltered = ApgEdr_Service_Core.FilterLinksByLogin(this.MENU, isLoggedIn);
        const menu = this.getTranslatedLinks(menuFiltered, edr.language);

        const topMenuFiltered = ApgEdr_Service_Core.FilterLinksByLogin(this.TOP_MENU, isLoggedIn);
        const topMenu = this.getTranslatedLinks(topMenuFiltered, edr.language);

        templateData.page.data = {
            menu,
            topMenu
        };


        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }



}
