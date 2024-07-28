/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240701 Cleanup and alignment to ApgCdn
 * ----------------------------------------------------------------------------
 */

import {
    Edr
} from "../deps.ts";

/**
 * Routes del microservizio ApgEdr
 */
export enum ApgEdr_eRoutes {

    PAGE_HOME = "/",

    API_TEST = "/Edr/Test/Api",

    RESERVED_PAGE_USER_TEST = "/Edr/Test/Rsvd/User",

    RESERVED_PAGE_ADMIN_TEST = "/Edr/Test/Rsvd/Admin",

    TEMPLATE_TEST = "/templates/pages/ApgEdr_HtmlPageTemplate_Tools.html",


}