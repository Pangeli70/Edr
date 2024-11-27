/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241113 Extracted from Home resource
 * ----------------------------------------------------------------------------
 */


import {
    Tng, Uts
} from "../../deps.ts";
import {
    ApgEdr_Route_eShared
} from "../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_HtmlPageResource_Menu
} from "./ApgEdr_HtmlPageResource_Menu.ts";



export const ApgEdr_Menu_Dev_Tng = [

    {
        url: ApgEdr_Route_eShared.TNG_TEST,
        label: {
            IT: "Test modello",
            EN: "Template test"
        },
        title: {
            IT: "Test della risorsa per servire i templates ad altri servizi",
            EN: "Test for the resource used to serve templates to other services"
        },
        isReserved: false
    },

    {
        url: ApgEdr_Route_eShared.RESERVED_PAGE_TNG_TEMPLATES,
        label: {
            IT: "Modelli",
            EN: "Templates"
        },
        title: {
            IT: "Modelli di pagine disponibili per il template engine",
            EN: "Available page templates for the template engine"
        },
        isReserved: true
    },

    {
        url: ApgEdr_Route_eShared.RESERVED_PAGE_TNG_CACHES,
        label: {
            IT: "Cache",
            EN: "Cache"
        },
        title: {
            IT: "Dettagli della cache utilizzata dal template engine",
            EN: "Details of the cache used by the template engine"
        },
        isReserved: true
    },

]


export const ApgEdr_Menu_Dev_Tng_Top = [
    {
        url: ApgEdr_Route_eShared.PAGE_HOME,
        label: {
            IT: "Menu principale",
            EN: "Main menu"
        },
        title: {
            IT: "Torna a pagina inziale",
            EN: "Back to home page"
        },
        isReserved: false
    },
    {
        url: ApgEdr_Route_eShared.PAGE_MENU_DEV,
        label: {
            IT: "Sviluppatore",
            EN: "Developer"
        },
        title: {
            IT: "Torna a menu funzioni sviluppatore",
            EN: "Back to developer features menu"
        },
        isReserved: false
    },

]


export class ApgEdr_HtmlPageResource_Menu_Dev_Tng
    extends ApgEdr_HtmlPageResource_Menu {

    override paths = [ApgEdr_Route_eShared.PAGE_MENU_DEV_TENGINE];

    override readonly RESOURCE_NAME = ApgEdr_HtmlPageResource_Menu_Dev_Tng.name;

    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Template engine",
        IT: "Template engine"
    }

    override readonly MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_Dev_Tng;

    override readonly TOP_MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_Dev_Tng_Top;



}
