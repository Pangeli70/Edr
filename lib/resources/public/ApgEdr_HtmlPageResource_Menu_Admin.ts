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




export const ApgEdr_Menu_Admin = [

    {
        url: ApgEdr_Route_eShared.RESERVED_PAGE_USERS,
        label: {
            IT: "Utenti",
            EN: "Users"
        },
        title: {
            IT: "Lista degli utenti registrati per l'uso del servizion",
            EN: "List of the registered users for the use of the service"
        },
        isReserved: true
    },

    {
        url: ApgEdr_Route_eShared.RESERVED_PAGE_ERRORS,
        label: {
            IT: "Errori",
            EN: "Errors"
        },
        title: {
            IT: "Elenco degli errori riscontrati dal riavvio del servizio",
            EN: "List of the errors encountered from the service restart"
        },
        isReserved: true
    },

    {
        url: ApgEdr_Route_eShared.RESERVED_PAGE_LOG,
        label: {
            IT: "Chiamate",
            EN: "Log"
        },
        title: {
            IT: "Elenco delle chiamate ricevute dal riavvio del servizio",
            EN: "List of the calls received since the service restart"
        },
        isReserved: true
    },

    {
        url: ApgEdr_Route_eShared.RESERVED_PAGE_ENVIRONMENT,
        label: {
            IT: "Ambiente",
            EN: "Environment"
        },
        title: {
            IT: "Impostazioni dell'ambiente",
            EN: "Environment settings"
        },
        isReserved: true
    },

    {
        url: ApgEdr_Route_eShared.RESERVED_PAGE_STATUS,
        label: {
            IT: "Stato",
            EN: "Status"
        },
        title: {
            IT: "Stato di funzionamento dei servizi",
            EN: "Operational status if the servicess"
        },
        isReserved: true
    },

    {
        url: ApgEdr_Route_eShared.RESERVED_PAGE_TELEMETRY_PURGE,
        label: {
            IT: "Svuota telemetria",
            EN: "Purge telemetry"
        },
        title: {
            IT: "Svuota il database di telemetria",
            EN: "Purges the telemetry database"
        },
        isReserved: true
    },
]




export const ApgEdr_Menu_Admin_Top = [
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



export class ApgEdr_HtmlPageResource_Menu_Admin
    extends ApgEdr_HtmlPageResource_Menu {

    override paths = [ApgEdr_Route_eShared.PAGE_MENU_ADMIN];

    override readonly RESOURCE_NAME = ApgEdr_HtmlPageResource_Menu_Admin.name;

    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Administrator features",
        IT: "Funzioni amministratore"
    }

    override readonly MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_Admin;

    override readonly TOP_MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_Admin_Top;

}
