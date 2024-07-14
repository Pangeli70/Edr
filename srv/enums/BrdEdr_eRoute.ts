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

    PAGE_HOME = "/Brd/Edr/Home",

    PAGE_ERROR = "/Brd/Edr/Error/:id",

    PAGE_LOGIN = "/Brd/Edr/Auth/Login",

    PAGE_LOGOUT = "/Brd/Edr/Auth/Logout",
    
    PAGE_OTP = "/Brd/Edr/Auth/Otp",

    PAGE_TOOLS = "/Brd/Edr/Tools",

    RESERVED_PAGE_ADMIN = "/Brd/Edr/Rsvd/Admin",
    
    RESERVED_PAGE_USER = "/Brd/Edr/Rsvd/User",

    RESERVED_PAGE_LOG = "/Brd/Edr/Rsvd/Log",

    RESERVED_PAGE_LOG_ENTRY = "/Brd/Edr/Rsvd/Log/Entry/:id",

    API_TEST = "/Brd/Edr/Api/V01/Test",

    TEMPLATE_TEST = "/templates/pages/BrdEdr_HtmlPageTemplate_Tools.html",

    RESERVED_PAGE_TNG_MENU = "/Brd/Edr/Rsvd/Tng"

}