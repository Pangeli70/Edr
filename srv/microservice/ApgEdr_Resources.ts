/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240813 Cleanup
 * @version 1.1 APG 20240912 Test guest
 * ----------------------------------------------------------------------------
 */



import {
    Edr
} from "../deps.ts";
import {
    ApgEdr_HtmlPageResource_About
} from "../resources/ApgEdr_HtmlPageResource_About.ts";
import {
    ApgEdr_HtmlPageResource_Home
} from "../resources/ApgEdr_HtmlPageResource_Home.ts";





export const ApgEdr_Resources: typeof Edr.Drash.Resource[] = [

    Edr.ApgEdr_FileResource_AnyAsset,
    Edr.ApgEdr_FileResource_AnyTemplate,

    ApgEdr_HtmlPageResource_Home,
    ApgEdr_HtmlPageResource_About,
    Edr.ApgEdr_HtmlPageResource_Support,
    Edr.ApgEdr_HtmlPageResource_Menu_User,
    Edr.ApgEdr_HtmlPageResource_Menu_Dev,
    Edr.ApgEdr_HtmlPageResource_Menu_Dev_Test,
    Edr.ApgEdr_HtmlPageResource_Menu_Dev_Tng,
    Edr.ApgEdr_HtmlPageResource_Menu_Admin,

    Edr.ApgEdr_ReservedHtmlPageResource_Test_Admin,
    Edr.ApgEdr_ReservedHtmlPageResource_Test_Dev,
    Edr.ApgEdr_ReservedHtmlPageResource_Test_User,
    Edr.ApgEdr_ReservedHtmlPageResource_Test_Guest,

    Edr.ApgEdr_HtmlPageResource_Tools,

    Edr.ApgEdr_HtmlPageResource_Language,
    Edr.ApgEdr_HtmlPageResource_RequestOtp,
    Edr.ApgEdr_HtmlPageResource_Login,
    Edr.ApgEdr_HtmlPageResource_Error,

    Edr.ApgEdr_ReservedHtmlPageResource_Logout,

    Edr.ApgEdr_ReservedHtmlPageResource_Log_List,
    Edr.ApgEdr_ReservedHtmlPageResource_Log_Entry,
    Edr.ApgEdr_ReservedHtmlPageResource_Errors,
    Edr.ApgEdr_ReservedHtmlPageResource_Environment,

    Edr.ApgEdr_ReservedHtmlPageResource_Tng_Caches,
    Edr.ApgEdr_ReservedHtmlPageResource_Tng_File,
    Edr.ApgEdr_ReservedHtmlPageResource_Tng_Function,
    Edr.ApgEdr_ReservedHtmlPageResource_Tng_Chunk,
    Edr.ApgEdr_ReservedHtmlPageResource_Tng_Templates,

    Edr.ApgEdr_ReservedHtmlPageResource_User,
    Edr.ApgEdr_ReservedHtmlPageResource_User_Unlock,
    Edr.ApgEdr_ReservedHtmlPageResource_Users,

    Edr.ApgEdr_ReservedHtmlPageResource_Telemetry_Purge,

    Edr.ApgEdr_ReservedHtmlPageResource_Dev_Stories,
    Edr.ApgEdr_ReservedHtmlPageResource_Dev_Story,

    Edr.ApgEdr_ReservedHtmlPageResource_Status,

    Edr.ApgEdr_HtmlPageResource_Tst_Suites,
    Edr.ApgEdr_HtmlPageResource_Tst_Suite,
    Edr.ApgEdr_HtmlPageResource_Tst_Exec,
    Edr.ApgEdr_HtmlPageResource_Tst_Specs,

    Edr.ApgEdr_RestApiResource_Test,
];













