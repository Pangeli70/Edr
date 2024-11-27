/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241108 Extracted from Home resource
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


export const ApgEdr_Menu_Dev = [
    {
        url: ApgEdr_Route_eShared.PAGE_DEV_TOOLS,
        label: {
            IT: "Strumenti",
            EN: "Tools"
        },
        title: {
            IT: "Strumenti di sviluppo per i microservizi Apg",
            EN: "Development tools for Apg microservices"
        },
        isReserved: false
    },

    {
        url: ApgEdr_Route_eShared.PAGE_MENU_DEV_TENGINE,
        label: {
            IT: "Template engine",
            EN: "Template engine"
        },
        title: {
            IT: "Template engine per i microservizi Apg",
            EN: "Template engine for Apg microservices"
        },
        isReserved: false
    },

    {
        url: ApgEdr_Route_eShared.RESERVED_PAGE_DEV_STORIES,
        label: {
            IT: "Storie utente",
            EN: "User stories"
        },
        title: {
            IT: "Elencate per dominio del microservizio",
            EN: "Listed by the domain of the microservice"
        },
        isReserved: false
    },

    {
        url: ApgEdr_Route_eShared.PAGE_MENU_DEV_TEST,
        label: {
            IT: "Prove",
            EN: "Tests"
        },
        title: {
            IT: "Risorse per test E2E",
            EN: "End to end tests resources"
        },
        isReserved: false
    },

    {
        url: ApgEdr_Route_eShared.PAGE_DEV_TST_SUITES,
        label: {
            IT: "Unit tests",
            EN: "Unit Tests"
        },
        title: {
            IT: "Risorse per le spec e gli unit test",
            EN: "Spec and unit test resources"
        },
        isReserved: false
    },
]



export const ApgEdr_Menu_Dev_Top = [
    {
        url: ApgEdr_Route_eShared.PAGE_HOME,
        label: {
            IT: "Menu principale",
            EN: "Main menu"
        },
        title: {
            IT: "Pagina inziale",
            EN: "Home page"
        },
        isReserved: false
    },
]



export class ApgEdr_HtmlPageResource_Menu_Dev
    extends ApgEdr_HtmlPageResource_Menu {

    override paths = [ApgEdr_Route_eShared.PAGE_MENU_DEV];

    override readonly RESOURCE_NAME = ApgEdr_HtmlPageResource_Menu_Dev.name;

    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Developer features",
        IT: "Funzioni sviluppatore"
    }


    override readonly MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_Dev;

    override readonly TOP_MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_Dev_Top;

}
