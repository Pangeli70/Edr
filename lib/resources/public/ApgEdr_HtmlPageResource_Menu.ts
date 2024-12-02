/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241108 Extracted from Home resource
 * ----------------------------------------------------------------------------
 */


import {
    Drash, Tng, Uts
} from "../../deps.ts";
import {
    ApgEdr_Auth_eRole
} from "../../enums/ApgEdr_Auth_eRole.ts";
import {
    ApgEdr_Service
} from "../../services/ApgEdr_Service.ts";
import {
    ApgEdr_HtmlPageResource
} from "./ApgEdr_HtmlPageResource.ts";



export abstract class ApgEdr_HtmlPageResource_Menu

    extends ApgEdr_HtmlPageResource {

    /**
      * Abstract properties Must be overridden by subclasses
      */
    abstract readonly TITLE: Uts.ApgUts_IMultilanguage;
    abstract readonly MENU: Tng.ApgTng_IHyperlink[];
    abstract readonly TOP_MENU: Tng.ApgTng_IHyperlink[];

    override readonly TNG_TEMPLATES = {
        GET: "/pages/ApgEdr_HtmlPageTemplate_Menu_GET_01.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;


    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);

        const title = Uts.ApgUts_Translator.Translate(
            this.TITLE,
            edr.language
        );

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            title,
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        );

        const isLoggedIn = templateData.user.role != ApgEdr_Auth_eRole.ANONYMOUS;

        const menuFiltered = ApgEdr_Service.FilterLinksByLogin(this.MENU, isLoggedIn);
        const menu = this.getTranslatedLinks(menuFiltered, edr.language);

        const topMenuFiltered = ApgEdr_Service.FilterLinksByLogin(this.TOP_MENU, isLoggedIn);
        const topMenu = this.getTranslatedLinks(topMenuFiltered, edr.language);

        templateData.page.data = {
            menu,
            topMenu
        };


        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }



}
