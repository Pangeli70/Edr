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
        url: Edr.ApgEdr_Route_eShared.PAGE_LANGUAGE,
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
        url: Edr.ApgEdr_Route_eShared.PAGE_TOOLS,
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
        url: ApgEdr_eRoutes.API_TEST,
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
        url: ApgEdr_eRoutes.TEMPLATE_TEST,
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
        url: ApgEdr_eRoutes.RESERVED_PAGE_GUEST_TEST,
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
        url: ApgEdr_eRoutes.RESERVED_PAGE_USER_TEST,
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
        url: ApgEdr_eRoutes.RESERVED_PAGE_ADMIN_TEST,
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
        url: Edr.ApgEdr_Route_eShared.PAGE_LOGOUT,
        label: {
            IT: "Esci",
            EN: "Log out"
        },
        title: {
            IT: "Rinuncia all'accesso alle pagine riservate del servizio",
            EN: "Give up the access to the reserved pages of the service"
        },
        isReserved: true
    },

    {
        url: Edr.ApgEdr_Route_eShared.RESERVED_PAGE_USERS,
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
        url: Edr.ApgEdr_Route_eShared.RESERVED_PAGE_ERRORS,
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
        url: Edr.ApgEdr_Route_eShared.RESERVED_PAGE_LOG,
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
        url: Edr.ApgEdr_Route_eShared.RESERVED_PAGE_TNG_TEMPLATES,
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
        url: Edr.ApgEdr_Route_eShared.RESERVED_PAGE_TNG_CACHES,
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
    {
        url: Edr.ApgEdr_Route_eShared.RESERVED_PAGE_ENVIRONMENT,
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
        url: Edr.ApgEdr_Route_eShared.RESERVED_PAGE_TELEMETRY_PURGE,
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
];
