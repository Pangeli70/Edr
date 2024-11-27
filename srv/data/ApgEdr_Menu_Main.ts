/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240701 Cleanup
 * @version 1.1 APG 20240814 Resort the menu and improved texts
 * ----------------------------------------------------------------------------
 */

import {
    Tng, Edr
} from "../deps.ts";
import {
    ApgEdr_eRoutes
} from "../enums/ApgEdr_eRoute.ts";



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
        url: Edr.ApgEdr_Route_eShared.PAGE_MENU_DEV,
        label: {
            IT: "Sviluppo",
            EN: "Development"
        },
        title: {
            IT: "Gestione attività di sviluppo",
            EN: "Development activities management"
        },
        isReserved: false
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
        isReserved: true
    },

];









