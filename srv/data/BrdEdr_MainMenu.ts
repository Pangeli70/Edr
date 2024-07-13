/** ---------------------------------------------------------------------------
 * @module [BrdEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240701 Cleanup and alignment to BrdCdn
 * ----------------------------------------------------------------------------
 */

import {
    Tng
} from "../deps.ts";
import {
    BrdEdr_eRoutes
} from "../enums/BrdEdr_eRoute.ts";



/**
 * Menu principale del microservizio BrdEdr
 */
export const BrdEdr_MainMenu: Tng.BrdTng_IHyperlink[] = [
    {
        url: BrdEdr_eRoutes.PAGE_TOOLS,
        label: {
            IT: "Strumenti",
            EN: "Tools"
        },
        title: {
            IT: "Strumenti di sviluppo per i microservizi Brd",
            EN: "Development tools for Brd microservices"
        },
    },
    {
        url: BrdEdr_eRoutes.API_TEST,
        label: {
            IT: "Test Rest API",
            EN: "Rest API test"
        },
        title: {
            IT: "Test della classe base per una risorsa REST",
            EN: "Test of the base class for REST resource"
        }
    },
    {
        url: BrdEdr_eRoutes.TEMPLATE_TEST,
        label: {
            IT: "Template test",
            EN: "Template test"
        },
        title: {
            IT: "Test della risorsa per servire i templates ad altri servizi",
            EN: "Test for the resource used to serve templates to other services"
        }
    },
    {
        url: BrdEdr_eRoutes.PAGE_LOGIN,
        label: {
            IT: "Accedi",
            EN: "Log in"
        },
        title: {
            IT: "Accesso alle pagine riservate del servizio",
            EN: "Access to the reserved pages of the service"
        }
    },
    {
        url: BrdEdr_eRoutes.PAGE_LOGOUT,
        label: {
            IT: "Esci",
            EN: "Log out"
        },
        title: {
            IT: "Rinuncia all'accesso alle pagine riservate del servizio",
            EN: "Recede the access to the reserved pages of the service"
        }
    },
    {
        url: BrdEdr_eRoutes.RESERVED_PAGE_USER,
        label: {
            IT: "Pagina utente",
            EN: "User page"
        },
        title: {
            IT: "Esempio di pagina riservata per gli utenti",
            EN: "Example of reserved page for users"
        }
    },
    {
        url: BrdEdr_eRoutes.RESERVED_PAGE_ADMIN,
        label: {
            IT: "Pagina amminst.",
            EN: "Admin page"
        },
        title: {
            IT: "Esempio di pagina riservata per gli amministratori",
            EN: "Example of reserved page for administrators"
        }
    },
    {
        url: BrdEdr_eRoutes.RESERVED_PAGE_LOG,
        label: {
            IT: "Registro chiamate",
            EN: "Requests' log"
        },
        title: {
            IT: "Elenco delle chiamate ricevute dal riavvio del servizio",
            EN: "List of the calls received from the service restart"
        }
    },
];
