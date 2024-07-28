/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * ----------------------------------------------------------------------------
 */


import * as Edr from "../lib/mod.ts";
import {
    ApgEdr_HtmlPageResource_Error
} from "./resources/ApgEdr_HtmlPageResource_Error.ts";
import {
    ApgEdr_HtmlPageResource_Home
} from "./resources/ApgEdr_HtmlPageResource_Home.ts";
import {
    ApgEdr_HtmlPageResource_Login
} from "./resources/ApgEdr_HtmlPageResource_Login.ts";
import {
    ApgEdr_HtmlPageResource_Logout
} from "./resources/ApgEdr_HtmlPageResource_Logout.ts";
import {
    ApgEdr_HtmlPageResource_Otp
} from "./resources/ApgEdr_HtmlPageResource_Otp.ts";
import {
    ApgEdr_HtmlPageResource_Tools
} from "./resources/ApgEdr_HtmlPageResource_Tools.ts";
import {
    ApgEdr_ReservedHtmlPageResource_Admin
} from "./resources/ApgEdr_ReservedHtmlPageResource_Admin.ts";
import {
    ApgEdr_ReservedHtmlPageResource_Errors
} from "./resources/ApgEdr_ReservedHtmlPageResource_Errors.ts";
import {
    ApgEdr_ReservedHtmlPageResource_Log
} from "./resources/ApgEdr_ReservedHtmlPageResource_Log.ts";
import {
    ApgEdr_ReservedHtmlPageResource_LogEntry
} from "./resources/ApgEdr_ReservedHtmlPageResource_LogEntry.ts";
import {
    ApgEdr_ReservedHtmlPageResource_Tng_Caches
} from "./resources/ApgEdr_ReservedHtmlPageResource_Tng_Caches.ts";
import {
    ApgEdr_ReservedHtmlPageResource_Tng_File
} from "./resources/ApgEdr_ReservedHtmlPageResource_Tng_File.ts";
import {
    ApgEdr_ReservedHtmlPageResource_Tng_Function
} from "./resources/ApgEdr_ReservedHtmlPageResource_Tng_Function.ts";
import {
    ApgEdr_ReservedHtmlPageResource_Tng_Templates
} from "./resources/ApgEdr_ReservedHtmlPageResource_Tng_Templates.ts";
import {
    ApgEdr_ReservedHtmlPageResource_User
} from "./resources/ApgEdr_ReservedHtmlPageResource_User.ts";
import {
    ApgEdr_RestApiResource_Test
} from "./resources/ApgEdr_RestApiResource_Test.ts";



export const ApgEdr_Middlewares: Edr.Drash.Service[] = [

    new Edr.ApgEdr_Middleware_Any(),
    new Edr.ApgEdr_Middleware_Auth(),
    new Edr.ApgEdr_Middleware_Log(Edr.ApgEdr_Service.Requests),

]



export const ApgEdr_Resources: typeof Edr.Drash.Resource[] = [

    Edr.ApgEdr_FileResource_AnyAsset,
    Edr.ApgEdr_FileResource_AnyTemplate,

    ApgEdr_HtmlPageResource_Error,

    ApgEdr_HtmlPageResource_Home,
    ApgEdr_HtmlPageResource_Otp,
    ApgEdr_HtmlPageResource_Tools,

    ApgEdr_HtmlPageResource_Login,
    ApgEdr_HtmlPageResource_Logout,
    ApgEdr_ReservedHtmlPageResource_User,
    ApgEdr_ReservedHtmlPageResource_Admin,
    ApgEdr_ReservedHtmlPageResource_Log,
    ApgEdr_ReservedHtmlPageResource_LogEntry,
    ApgEdr_ReservedHtmlPageResource_Errors,

    ApgEdr_ReservedHtmlPageResource_Tng_Caches,
    ApgEdr_ReservedHtmlPageResource_Tng_File,
    ApgEdr_ReservedHtmlPageResource_Tng_Function,
    ApgEdr_ReservedHtmlPageResource_Tng_Templates,
    
    ApgEdr_RestApiResource_Test

];

