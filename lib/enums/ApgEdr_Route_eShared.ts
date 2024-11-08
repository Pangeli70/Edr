/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240701
 * @version 0.2 APG 20240726 English comments
 * @version 0.3 APG 20241107 Telemetry and Dev
 * ----------------------------------------------------------------------------
 */

/**
 * Predefined Shared Routes exported by an Edr based microservice
 */
export enum ApgEdr_Route_eShared {


    FILE_ANY_ASSET = "/assets/*",

    FILE_ANY_TEMPLATE = "/templates/*",

    PAGE_HOME = "/",

    PAGE_ERROR = "/Edr/Error",

    PAGE_MESSAGE = "/Edr/Message",

    PAGE_LANGUAGE = "/Edr/Language",

    PAGE_LOGIN = "/Edr/Auth/Login",

    PAGE_LOGOUT = "/Edr/Auth/Logout",
    
    PAGE_REQ_OTP = "/Edr/Auth/Otp",

    PAGE_SUPPORT = "/Edr/Support",

    PAGE_TOOLS = "/Edr/Tools",


    RESERVED_PAGE_ERRORS = "/Edr/Rsvd/Errors",

    RESERVED_PAGE_LOG = "/Edr/Rsvd/Log",

    RESERVED_PAGE_LOG_ENTRY = "/Edr/Rsvd/Log/Entry",

    RESERVED_PAGE_TNG_TEMPLATES = "/Edr/Rsvd/Tng/Templates",

    RESERVED_PAGE_TNG_CACHES = "/Edr/Rsvd/Tng/Caches",

    RESERVED_PAGE_TNG_FILE = "/Edr/Rsvd/Tng/File",

    RESERVED_PAGE_TNG_FUNCTION = "/Edr/Rsvd/Tng/Function",

    RESERVED_PAGE_TNG_CHUNK = "/Edr/Rsvd/Tng/Chunk",

    RESERVED_PAGE_ENVIRONMENT = "/Edr/Rsvd/Environment",

    RESERVED_PAGE_USERS = "/Edr/Rsvd/Users",
    
    RESERVED_PAGE_USER = "/Edr/Rsvd/User",

    RESERVED_PAGE_USER_UNLOCK = "/Edr/Rsvd/User/Unlock",

    RESERVED_PAGE_TELEMETRY_PURGE = "/Edr/Rsvd/Telemetry/Purge",

    RESERVED_PAGE_TELEMETRY = "/Edr/Rsvd/Telemetry",

    RESERVED_PAGE_STATUS= "/Edr/Rsvd/Status",

    RESERVED_PAGE_DEV_STORIES = "/Edr/Rsvd/Dev/Stories",
    RESERVED_PAGE_DEV_STORY = "/Edr/Rsvd/Dev/Story",
    RESERVED_PAGE_DEV_ACTIVITY = "/Edr/Rsvd/Dev/Activity",
    RESERVED_PAGE_DEV_LOG = "/Edr/Rsvd/Dev/Log",



}