/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/07/01] Cleanup
 * @version 1.0.1 [APG 2024/08/14] Sort the menu and improved texts
 * @version 1.0.2 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Tng, Edr } from "../deps.ts";
import { ApgEdr_eRoutes } from "../enums/ApgEdr_eRoute.ts";



/**
 * Menu principale del microservizio ApgEdr
 */
export const ApgEdr_Menu_Main: Tng.ApgTng_IHyperlink[] = [


    {
        url: Edr.ApgEdr_Route_eShared.PAGE_REQ_OTP,
        label: {
            IT: "Accedi",
            EN: "Log in"
        },
        title: {
            IT: "Accesso alle pagine riservate del servizio",
            EN: "Access to the reserved pages of the service"
        },
        isReserved: false,
        isAnonymousOnly: true
    },
    {
        url: Edr.ApgEdr_Route_eShared.PAGE_MENU_USER,
        label: {
            IT: "Utente",
            EN: "User"
        },
        title: {
            IT: "Impostazioni per l'utente",
            EN: "User's options"
        },
        isReserved: false
    },
    {
        url: Edr.ApgEdr_Route_eShared.PAGE_MENU_TEST_AUTH,
        label: {
            IT: "Autenticazione",
            EN: "Authentication"
        },
        title: {
            IT: "Verifica accessibilità pagine riservate per ruolo",
            EN: "Role access verification for reserved pages"
        },
        isReserved: false
    },
    {
        url: Edr.ApgEdr_Route_eShared.PAGE_MENU_TEST_API,
        label: {
            IT: "API",
            EN: "API"
        },
        title: {
            IT: "Esempi risorse API",
            EN: "API resources examples"
        },
        isReserved: false
    },
    {
        url: Edr.ApgEdr_Route_eShared.PAGE_MENU_DEV,
        label: {
            IT: "Sviluppatore",
            EN: "Developer"
        },
        title: {
            IT: "Funzioni per sviluppatori",
            EN: "Developers features"
        },
        isReserved: true
    },

    {
        url: Edr.ApgEdr_Route_eShared.PAGE_MENU_ADMIN,
        label: {
            IT: "Amministratore",
            EN: "Administrator"
        },
        title: {
            IT: "Funzioni per gli amministratori",
            EN: "Administrators features"
        },
        isReserved: true
    },

    {
        url: ApgEdr_eRoutes.PAGE_ABOUT,
        label: {
            IT: "A propostito",
            EN: "About"
        },
        title: {
            IT: "Descrizione e spiegazione delle funzionalità del sito o del microservizio",
            EN: "Description and explanation of the functionality of the site or the microservice"
        },
        isReserved: false
    },

];









