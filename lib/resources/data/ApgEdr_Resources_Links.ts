import { Tng } from "../../deps.ts";
import {ApgEdr_Route_eShared} from "../../enums/ApgEdr_Route_eShared.ts";



export const ApgEdr_Shared_Links: Record<ApgEdr_Route_eShared, Tng.ApgTng_IHyperlink> = {


    [ApgEdr_Route_eShared.PAGE_HOME]: {
        url: ApgEdr_Route_eShared.PAGE_HOME,
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
    [ApgEdr_Route_eShared.PAGE_MENU]: {
        url: ApgEdr_Route_eShared.PAGE_MENU,
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
    [ApgEdr_Route_eShared.PAGE_MENU_USER]: {
        url: ApgEdr_Route_eShared.PAGE_MENU_USER,
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
    [ApgEdr_Route_eShared.PAGE_MENU_DEV]: {
        url: ApgEdr_Route_eShared.PAGE_MENU_DEV,
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
    [ApgEdr_Route_eShared.PAGE_MENU_DEV_TEST]: {
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
    [ApgEdr_Route_eShared.PAGE_MENU_DEV_TENGINE]: {
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



    [ApgEdr_Route_eShared.PAGE_LANGUAGE]: {
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
    [ApgEdr_Route_eShared.PAGE_REQ_SUPPORT]: {
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
    [ApgEdr_Route_eShared.PAGE_ABOUT]: {
        url: ApgEdr_Route_eShared.PAGE_ABOUT,
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



    [ApgEdr_Route_eShared.PAGE_REQ_OTP]: {
        url: ApgEdr_Route_eShared.PAGE_REQ_OTP,
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
    [ApgEdr_Route_eShared.PAGE_LOGOUT]: {
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



    [ApgEdr_Route_eShared.RESERVED_PAGE_DEV_TEST_GUEST]: {
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
    [ApgEdr_Route_eShared.RESERVED_PAGE_DEV_TEST_USER]: {
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
    [ApgEdr_Route_eShared.RESERVED_PAGE_DEV_TEST_DEV]: {
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
    [ApgEdr_Route_eShared.RESERVED_PAGE_DEV_TEST_ADMIN]: {
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



    [ApgEdr_Route_eShared.RESERVED_PAGE_LOG]: {
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
    [ApgEdr_Route_eShared.RESERVED_PAGE_ERRORS]: {
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
    [ApgEdr_Route_eShared.RESERVED_PAGE_TELEMETRY]: {
        url: ApgEdr_Route_eShared.RESERVED_PAGE_TELEMETRY,
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
    [ApgEdr_Route_eShared.RESERVED_PAGE_TELEMETRY_PURGE]: {
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



    [ApgEdr_Route_eShared.TNG_TEST]: {
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
    [ApgEdr_Route_eShared.RESERVED_PAGE_TNG_TEMPLATES]:
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
    [ApgEdr_Route_eShared.RESERVED_PAGE_TNG_CACHES]:
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



    [ApgEdr_Route_eShared.RESERVED_PAGE_USERS]: {
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



    [ApgEdr_Route_eShared.RESERVED_PAGE_ENVIRONMENT]: {
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
    [ApgEdr_Route_eShared.RESERVED_PAGE_STATUS]: {
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



    [ApgEdr_Route_eShared.API_TEST]: {
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


    [ApgEdr_Route_eShared.PAGE_DEV_TOOLS]: {
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


    [ApgEdr_Route_eShared.PAGE_DEV_TST_SUITES]: {
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

    [ApgEdr_Route_eShared.PAGE_DEV_TST_SUITE]: {
        url: ApgEdr_Route_eShared.PAGE_DEV_TST_SUITE,
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


    [ApgEdr_Route_eShared.RESERVED_PAGE_DEV_STORIES]: {
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

}