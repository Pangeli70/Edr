/** ---------------------------------------------------------------------------
 * @module [BrdEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240701 Cleanup and alignment to BrdCdn
 * ----------------------------------------------------------------------------
 */

/**
 * Routes Codivise del microservizio BrdEdr
 */
export enum BrdEdr_Route_eShared {

    PAGE_ERROR = "/Brd/Edr/Error/:id",

    PAGE_LOGIN = "/Brd/Edr/Auth/Login",

    PAGE_LOGOUT = "/Brd/Edr/Auth/Logout",
    
    PAGE_OTP = "/Brd/Edr/Auth/Otp",

    PAGE_TOOLS = "/Brd/Edr/Tools",

    RESERVED_PAGE_ERRORS = "/Brd/Edr/Rsvd/Errors",

    RESERVED_PAGE_LOG = "/Brd/Edr/Rsvd/Log",

    RESERVED_PAGE_LOG_ENTRY = "/Brd/Edr/Rsvd/Log/Entry/:id",

    RESERVED_PAGE_TNG_TEMPLATES = "/Brd/Edr/Rsvd/Tng/Templates",

    RESERVED_PAGE_TNG_CACHE = "/Brd/Edr/Rsvd/Tng/Cache",


}