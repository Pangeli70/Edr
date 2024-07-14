/** ---------------------------------------------------------------------------
 * @module [BrdEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240701 Cleanup and alignment to BrdCdn
 * ----------------------------------------------------------------------------
 */

/**
 * Routes del microservizio BrdEdr
 */
export enum BrdEdr_eRoutes {

    PAGE_HOME = "/",

    API_TEST = "/Brd/Edr/Api/V01/Test",

    RESERVED_PAGE_USER_TEST = "/Brd/Edr/Rsvd/User",

    RESERVED_PAGE_ADMIN_TEST = "/Brd/Edr/Rsvd/Admin",

    TEMPLATE_TEST = "/templates/pages/BrdEdr_HtmlPageTemplate_Tools.html",


}