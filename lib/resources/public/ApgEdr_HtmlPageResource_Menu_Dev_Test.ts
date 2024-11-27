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



export const ApgEdr_Menu_Dev_Test = [
    {
        url: ApgEdr_Route_eShared.API_TEST,
        label: {
            IT: "Test Rest API",
            EN: "Rest API test"
        },
        title: {
            IT: "Test della classe base per una risorsa REST",
            EN: "Test of the base class for REST resource"
        },
        isReserved: false
    },
    {
        url: ApgEdr_Route_eShared.RESERVED_PAGE_DEV_TEST_GUEST,
        label: {
            IT: "Test ospite",
            EN: "Test guest"
        },
        title: {
            IT: "Esempio di pagina riservata per gli ospiti",
            EN: "Example of reserved page for guests"
        },
        isReserved: true
    },
    {
        url: ApgEdr_Route_eShared.RESERVED_PAGE_DEV_TEST_USER,
        label: {
            IT: "Test utente",
            EN: "Test user"
        },
        title: {
            IT: "Esempio di pagina riservata per gli utenti",
            EN: "Example of reserved page for users"
        },
        isReserved: true
    },
    {
        url: ApgEdr_Route_eShared.RESERVED_PAGE_DEV_TEST_DEV,
        label: {
            IT: "Test svilupp.",
            EN: "Test developer"
        },
        title: {
            IT: "Esempio di pagina riservata per gli sviluppatori",
            EN: "Example of reserved page for developers"
        },
        isReserved: true
    },
    {
        url: ApgEdr_Route_eShared.RESERVED_PAGE_DEV_TEST_ADMIN,
        label: {
            IT: "Test ammin.",
            EN: "Test admin"
        },
        title: {
            IT: "Esempio di pagina riservata per gli amministratori",
            EN: "Example of reserved page for administrators"
        },
        isReserved: true
    },

]


export const ApgEdr_Menu_Dev_Test_Top = [
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


export class ApgEdr_HtmlPageResource_Menu_Dev_Test
    extends ApgEdr_HtmlPageResource_Menu {

    override paths = [ApgEdr_Route_eShared.PAGE_MENU_DEV_TEST];

    override readonly RESOURCE_NAME = ApgEdr_HtmlPageResource_Menu_Dev_Test.name;

    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Test",
        IT: "Prove"
    }


    override readonly MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_Dev_Test;

    override readonly TOP_MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_Dev_Test_Top;



}
