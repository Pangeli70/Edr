/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2024/07/01]
 * @version 0.9.2 [APG 2024/07/26] English comments
 * @version 0.9.3 [APG 2024/11/07] Telemetry and Dev
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

/**
 * Predefined Shared Routes exported by an Edr based microservice
 */
export enum ApgEdr_Route_eShared {


    FILE_ANY_ASSET = "/assets/*", //++
    
    FILE_ANY_TEMPLATE = "/templates/*", //++
    
    PAGE_HOME = "/",
    PAGE_MENU = "/Menu",
    PAGE_MENU_USER = "/Menu/User",
    PAGE_MENU_DEV = "/Menu/Dev",
    PAGE_MENU_DEV_TENGINE = "/Menu/Dev/Tengine",
    PAGE_MENU_TEST_AUTH = "/Menu/Test/Auth",
    PAGE_MENU_TEST_API = "/Menu/Test/Api",
    PAGE_MENU_ADMIN = "/Menu/Admin", //++
    
    PAGE_MESSAGE = "/Edr/Message", //++
    PAGE_ERROR = "/Edr/Error", //++
    
    PAGE_LANGUAGE = "/Edr/Language",
    PAGE_REQ_SUPPORT = "/Edr/Support",
    PAGE_ABOUT = "/Edr/About",
    
    PAGE_LOGIN = "/Edr/Auth/Login", //++
    PAGE_REQ_OTP = "/Edr/Auth/Otp",
    PAGE_LOGOUT = "/Edr/Auth/Logout",
    
    DEV_PAGE_AUTH_TEST_GUEST = "/Edr/Dev/Auth/Test/Guest",
    DEV_PAGE_AUTH_TEST_USER = "/Edr/Dev/Auth/Test/User",
    DEV_PAGE_AUTH_TEST_DEV = "/Edr/Dev/Auth/Test/Dev",
    DEV_PAGE_AUTH_TEST_ADMIN = "/Edr/Dev/Auth/Test/Admin",

    DEV_PAGE_REQUESTS = "/Edr/Dev/Requests",
    DEV_PAGE_REQUEST = "/Edr/Dev/Request", //++
    DEV_PAGE_ERRORS = "/Edr/Dev/Errors",
    DEV_PAGE_TELEMETRY = "/Edr/Dev/Telemetry",
    DEV_PAGE_TELEMETRY_PURGE = "/Edr/Dev/Telemetry/Purge",

    TNG_TEST = "/templates/pages/ApgEdr_TngTemplate_Tools_01.html",

    DEV_PAGE_TNG_TEMPLATES = "/Edr/Dev/Tng/Templates",
    DEV_PAGE_TNG_CACHES = "/Edr/Dev/Tng/Caches",
    DEV_PAGE_TNG_FILE = "/Edr/Dev/Tng/File",  //++
    DEV_PAGE_TNG_FUNCTION = "/Edr/Dev/Tng/Function",  //++
    DEV_PAGE_TNG_CHUNK = "/Edr/Dev/Tng/Chunk",  //++

    ADMIN_PAGE_USERS = "/Edr/Admin/Users",
    ADMIN_PAGE_USER = "/Edr/Admin/User",
    ADMIN_PAGE_USER_UNLOCK = "/Edr/Admin/User/Unlock",

    DEV_PAGE_ENVIRONMENT = "/Edr/Dev/Environment",
    DEV_PAGE_STATUS = "/Edr/Dev/Status",

    API_TEST = "/Edr/Api/Test",

    DEV_PAGE_TOOLS = "/Edr/Dev/Tools",

    DEV_PAGE_TST_SUITES = "/Edr/Dev/Tst/Suites",
    DEV_PAGE_TST_SUITE = "/Edr/Dev/Tst/Suite", //++
    DEV_PAGE_TST_EXEC = "/Edr/Dev/Tst/Exec", //++
    DEV_PAGE_TST_SPEC = "/Edr/Dev/Tst/Spec", //++

    DEV_PAGE_STORIES = "/Edr/Dev/Stories",
    DEV_PAGE_STORY = "/Edr/Dev/Story", //++
    DEV_PAGE_ACTIVITY = "/Edr/Dev/Activity", //++
    DEV_PAGE_BACKLOG = "/Edr/Dev/Backlog",  //++

}