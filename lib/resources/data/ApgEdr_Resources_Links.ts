/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/08/13]
 * ----------------------------------------------------------------------------
*/

import { Tng } from "../../deps.ts";
import { ApgEdr_eRoute } from "../../enums/ApgEdr_eRoute.ts";



export const ApgEdr_Resources_Links: Record<string, Tng.ApgTng_IHyperlink> = {


    [ApgEdr_eRoute.PAGE_HOME]: {
        url: ApgEdr_eRoute.PAGE_HOME,
        label: {
            IT: "Home",
            EN: "Home "
        },
        title: {
            IT: "Pagina inziale",
            EN: "Home page"
        },
        isReserved: false
    },

    [ApgEdr_eRoute.PAGE_MENU]: {
        url: ApgEdr_eRoute.PAGE_MENU,
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

    [ApgEdr_eRoute.PAGE_MENU_USER]: {
        url: ApgEdr_eRoute.PAGE_MENU_USER,
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

    [ApgEdr_eRoute.PAGE_MENU_TEST_AUTH]:
    {
        url: ApgEdr_eRoute.PAGE_MENU_TEST_AUTH,
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

    [ApgEdr_eRoute.PAGE_MENU_TEST_API]: {
        url: ApgEdr_eRoute.PAGE_MENU_TEST_API,
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

    [ApgEdr_eRoute.PAGE_MENU_ADMIN]: {
        url: ApgEdr_eRoute.PAGE_MENU_ADMIN,
        label: {
            IT: "Amministratore",
            EN: "Administrator"
        },
        title: {
            IT: "Impostazioni per l'amministratore",
            EN: "Adminstrator's options"
        },
        isReserved: false
    },

    [ApgEdr_eRoute.PAGE_MENU_DEV]: {
        url: ApgEdr_eRoute.PAGE_MENU_DEV,
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

    [ApgEdr_eRoute.PAGE_MENU_DEV_TENGINE]: {
        url: ApgEdr_eRoute.PAGE_MENU_DEV_TENGINE,
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



    [ApgEdr_eRoute.PAGE_LANGUAGE]: {
        url: ApgEdr_eRoute.PAGE_LANGUAGE,
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

    [ApgEdr_eRoute.PAGE_REQ_SUPPORT]: {
        url: ApgEdr_eRoute.PAGE_REQ_SUPPORT,
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

    [ApgEdr_eRoute.PAGE_ABOUT]: {
        url: ApgEdr_eRoute.PAGE_ABOUT,
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



    [ApgEdr_eRoute.PAGE_REQ_OTP]: {
        url: ApgEdr_eRoute.PAGE_REQ_OTP,
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

    [ApgEdr_eRoute.PAGE_LOGOUT]: {
        url: ApgEdr_eRoute.PAGE_LOGOUT,
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



    [ApgEdr_eRoute.DEV_PAGE_AUTH_TEST_GUEST]: {
        url: ApgEdr_eRoute.DEV_PAGE_AUTH_TEST_GUEST,
        label: {
            IT: "Test ospite",
            EN: "Test guest"
        },
        title: {
            IT: "Esempio di pagina riservata per gli ospiti",
            EN: "Example of reserved page for guests"
        },
        isReserved: false
    },

    [ApgEdr_eRoute.DEV_PAGE_AUTH_TEST_USER]: {
        url: ApgEdr_eRoute.DEV_PAGE_AUTH_TEST_USER,
        label: {
            IT: "Test utente",
            EN: "Test user"
        },
        title: {
            IT: "Esempio di pagina riservata per gli utenti",
            EN: "Example of reserved page for users"
        },
        isReserved: false
    },

    [ApgEdr_eRoute.DEV_PAGE_AUTH_TEST_DEV]: {
        url: ApgEdr_eRoute.DEV_PAGE_AUTH_TEST_DEV,
        label: {
            IT: "Test svilupp.",
            EN: "Test developer"
        },
        title: {
            IT: "Esempio di pagina riservata per gli sviluppatori",
            EN: "Example of reserved page for developers"
        },
        isReserved: false
    },

    [ApgEdr_eRoute.DEV_PAGE_AUTH_TEST_ADMIN]: {
        url: ApgEdr_eRoute.DEV_PAGE_AUTH_TEST_ADMIN,
        label: {
            IT: "Test ammin.",
            EN: "Test admin"
        },
        title: {
            IT: "Esempio di pagina riservata per gli amministratori",
            EN: "Example of reserved page for administrators"
        },
        isReserved: false
    },



    [ApgEdr_eRoute.DEV_PAGE_REQUESTS]: {
        url: ApgEdr_eRoute.DEV_PAGE_REQUESTS,
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

    [ApgEdr_eRoute.DEV_PAGE_ERRORS]: {
        url: ApgEdr_eRoute.DEV_PAGE_ERRORS,
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

    [ApgEdr_eRoute.DEV_PAGE_TELEMETRY]: {
        url: ApgEdr_eRoute.DEV_PAGE_TELEMETRY,
        label: {
            IT: "Telemetria",
            EN: "Telemetry"
        },
        title: {
            IT: "Analizza il database di telemetria",
            EN: "Analyze the telemetry database"
        },
        isReserved: true
    },

    [ApgEdr_eRoute.DEV_PAGE_TELEMETRY_PURGE]: {
        url: ApgEdr_eRoute.DEV_PAGE_TELEMETRY_PURGE,
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


    [ApgEdr_eRoute.DEV_PAGE_TNG_TEMPLATES]:
    {
        url: ApgEdr_eRoute.DEV_PAGE_TNG_TEMPLATES,
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

    [ApgEdr_eRoute.DEV_PAGE_TNG_CACHES]:
    {
        url: ApgEdr_eRoute.DEV_PAGE_TNG_CACHES,
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



    [ApgEdr_eRoute.ADMIN_PAGE_USERS]: {
        url: ApgEdr_eRoute.ADMIN_PAGE_USERS,
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



    [ApgEdr_eRoute.DEV_PAGE_ENVIRONMENT]: {
        url: ApgEdr_eRoute.DEV_PAGE_ENVIRONMENT,
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

    [ApgEdr_eRoute.DEV_PAGE_STATUS]: {
        url: ApgEdr_eRoute.DEV_PAGE_STATUS,
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



    [ApgEdr_eRoute.API_TEST]: {
        url: ApgEdr_eRoute.API_TEST,
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


    [ApgEdr_eRoute.DEV_PAGE_TOOLS]: {
        url: ApgEdr_eRoute.DEV_PAGE_TOOLS,
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


    [ApgEdr_eRoute.DEV_PAGE_TST_SUITES]: {
        url: ApgEdr_eRoute.DEV_PAGE_TST_SUITES,
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

    [ApgEdr_eRoute.DEV_PAGE_TST_SUITE]: {
        url: ApgEdr_eRoute.DEV_PAGE_TST_SUITE,
        label: {
            IT: "Unit test",
            EN: "Unit Test"
        },
        title: {
            IT: "Esecuzione interattiva della spec",
            EN: "Interactive execution of the spec"
        },
        isReserved: false
    },


    [ApgEdr_eRoute.DEV_PAGE_STORIES]: {
        url: ApgEdr_eRoute.DEV_PAGE_STORIES,
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

}