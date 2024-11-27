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
    PAGE_MENU_USER = "/Menu/User",
    PAGE_MENU_DEV = "/Menu/Dev",
    PAGE_MENU_DEV_TEST = "/Menu/Dev/Test",
    PAGE_MENU_DEV_TENGINE = "/Menu/Dev/Tengine",
    PAGE_MENU_ADMIN = "/Menu/Admin",
    
    PAGE_ERROR = "/Edr/Error",
    
    PAGE_MESSAGE = "/Edr/Message",
    
    PAGE_LANGUAGE = "/Edr/Language",
    
    PAGE_LOGOUT = "/Edr/Auth/Logout",
    PAGE_LOGIN = "/Edr/Auth/Login",
    PAGE_REQ_OTP = "/Edr/Auth/Otp",
    
    PAGE_REQ_SUPPORT = "/Edr/Support",



    RESERVED_PAGE_ERRORS = "/Edr/Rsvd/Errors",

    RESERVED_PAGE_LOG = "/Edr/Rsvd/Log",
    RESERVED_PAGE_LOG_ENTRY = "/Edr/Rsvd/Log/Entry",

    RESERVED_PAGE_TELEMETRY_PURGE = "/Edr/Rsvd/Telemetry/Purge",
    RESERVED_PAGE_TELEMETRY = "/Edr/Rsvd/Telemetry",

    TNG_TEST = "/templates/pages/ApgEdr_HtmlPageTemplate_Tools_01.html",
    RESERVED_PAGE_TNG_TEMPLATES = "/Edr/Rsvd/Tng/Templates",
    RESERVED_PAGE_TNG_CACHES = "/Edr/Rsvd/Tng/Caches",
    RESERVED_PAGE_TNG_FILE = "/Edr/Rsvd/Tng/File",
    RESERVED_PAGE_TNG_FUNCTION = "/Edr/Rsvd/Tng/Function",
    RESERVED_PAGE_TNG_CHUNK = "/Edr/Rsvd/Tng/Chunk",

    RESERVED_PAGE_USERS = "/Edr/Rsvd/Users",
    RESERVED_PAGE_USER = "/Edr/Rsvd/User",
    RESERVED_PAGE_USER_UNLOCK = "/Edr/Rsvd/User/Unlock",

    RESERVED_PAGE_ENVIRONMENT = "/Edr/Rsvd/Environment",
    RESERVED_PAGE_STATUS = "/Edr/Rsvd/Status",

    PAGE_DEV_TOOLS = "/Edr/Dev/Tools",
    PAGE_DEV_TST_SUITES = "/Edr/Dev/Tst/Suites",
    PAGE_DEV_TST_SUITE = "/Edr/Dev/Tst/Suite",
    PAGE_DEV_TST_EXEC = "/Edr/Dev/Tst/Exec",
    PAGE_DEV_TST_SPEC = "/Edr/Dev/Tst/Spec",

    API_TEST = "/Edr/Api/Test",

    RESERVED_PAGE_DEV_STORIES = "/Edr/Rsvd/Dev/Stories",
    RESERVED_PAGE_DEV_STORY = "/Edr/Rsvd/Dev/Story",
    RESERVED_PAGE_DEV_ACTIVITY = "/Edr/Rsvd/Dev/Activity",
    RESERVED_PAGE_DEV_LOG = "/Edr/Rsvd/Dev/Log",

    RESERVED_PAGE_DEV_TEST_GUEST = "/Edr/Rsvd/Dev/Test/Guest",
    RESERVED_PAGE_DEV_TEST_DEV = "/Edr/Rsvd/Dev/Test/Dev",
    RESERVED_PAGE_DEV_TEST_USER = "/Edr/Rsvd/Dev/Test/User",
    RESERVED_PAGE_DEV_TEST_ADMIN = "/Edr/Rsvd/Dev/Test/Admin",

}