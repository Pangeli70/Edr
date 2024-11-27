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



export const ApgEdr_Menu_User = [
    {
        url: ApgEdr_Route_eShared.PAGE_LANGUAGE,
        label: {
            IT: "Lingua",
            EN: "Language"
        },
        title: {
            IT: "Imposta il cookie per la lingua di utilizzo del microservizio",
            EN: "Set the cookie for the language of use of the microservice"
        },
        isReserved: false
    },

    {
        url: ApgEdr_Route_eShared.PAGE_REQ_SUPPORT,
        label: {
            IT: "Supporto",
            EN: "Support"
        },
        title: {
            IT: "Richieste di supporto al team di sviluppo",
            EN: "Support requests to the development team"
        },
        isReserved: false
    },

    {
        url: ApgEdr_Route_eShared.PAGE_LOGOUT,
        label: {
            IT: "Esci",
            EN: "Log out"
        },
        title: {
            IT: "Ritorna allo stato di utente anonimo e rinuncia all'accesso alle pagine riservate del servizio",
            EN: "Return to the status of anonymus user and give up the access to the reserved pages of the service"
        },
        isReserved: true
    },
]

export const ApgEdr_Menu_User_Top = [
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


export class ApgEdr_HtmlPageResource_Menu_User
    extends ApgEdr_HtmlPageResource_Menu {

    override paths = [ApgEdr_Route_eShared.PAGE_MENU_USER];

    override readonly RESOURCE_NAME = ApgEdr_HtmlPageResource_Menu_User.name;

    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "User features",
        IT: "Funzioni utente"
    }

    override readonly MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_User;
    
    override readonly TOP_MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_User_Top;


}
