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
    ApgEdr_HtmlPageResource_Home
} from "../resources/ApgEdr_HtmlPageResource_Home.ts";

import {
    ApgEdr_RestApiResource_Test
} from "../resources/ApgEdr_RestApiResource_Test.ts";
import {
    ApgEdr_ReservedHtmlPageResource_TestAdmin
} from "../resources/reserved/admin/ApgEdr_ReservedHtmlPageResource_Test_Admin.ts";
import {
    ApgEdr_ReservedHtmlPageResource_TestGuest
} from "../resources/reserved/guest/ApgEdr_ReservedHtmlPageResource_Test_Guest.ts";
import {
    ApgEdr_ReservedHtmlPageResource_TestUser
} from "../resources/reserved/user/ApgEdr_ReservedHtmlPageResource_Test_User.ts";



export const ApgEdr_Resources: typeof Edr.Drash.Resource[] = [

    Edr.ApgEdr_FileResource_AnyAsset,
    Edr.ApgEdr_FileResource_AnyTemplate,

    ApgEdr_HtmlPageResource_Home,

    Edr.ApgEdr_HtmlPageResource_Tools,
    Edr.ApgEdr_HtmlPageResource_Language,
    Edr.ApgEdr_HtmlPageResource_RequestOtp,
    Edr.ApgEdr_HtmlPageResource_Login,
    Edr.ApgEdr_HtmlPageResource_Error,

    Edr.ApgEdr_ReservedHtmlPageResource_Logout,

    ApgEdr_ReservedHtmlPageResource_TestUser,
    ApgEdr_ReservedHtmlPageResource_TestAdmin,
    ApgEdr_ReservedHtmlPageResource_TestGuest,

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

    ApgEdr_RestApiResource_Test

];













