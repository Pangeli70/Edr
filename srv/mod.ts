/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * ----------------------------------------------------------------------------
 */


import * as Edr from "../lib/mod.ts";
import {
    BrdEdr_HtmlPageResource_Error
} from "./resources/BrdEdr_HtmlPageResource_Error.ts";
import {
    BrdEdr_HtmlPageResource_Home
} from "./resources/BrdEdr_HtmlPageResource_Home.ts";
import {
    BrdEdr_HtmlPageResource_Login
} from "./resources/BrdEdr_HtmlPageResource_Login.ts";
import {
    BrdEdr_HtmlPageResource_Logout
} from "./resources/BrdEdr_HtmlPageResource_Logout.ts";
import {
    BrdEdr_HtmlPageResource_Otp
} from "./resources/BrdEdr_HtmlPageResource_Otp.ts";
import {
    BrdEdr_HtmlPageResource_Tools
} from "./resources/BrdEdr_HtmlPageResource_Tools.ts";
import {
    BrdEdr_HtmlReservedPageResource_Admin
} from "./resources/BrdEdr_HtmlReservedHtmlResource_Admin.ts";
import {
    BrdEdr_HtmlReservedPageResource_Log
} from "./resources/BrdEdr_HtmlReservedHtmlResource_Log.ts";
import {
    BrdEdr_HtmlReservedPageResource_LogEntry
} from "./resources/BrdEdr_HtmlReservedHtmlResource_LogEntry.ts";
import {
    BrdEdr_HtmlReservedPageResource_User
} from "./resources/BrdEdr_HtmlReservedHtmlResource_User.ts";
import {
    BrdEdr_RestApiResource_Test
} from "./resources/BrdEdr_RestApiResource_Test.ts";



export const BrdEdr_Middlewares: Edr.Drash.Service[] = [

    new Edr.BrdEdr_Middleware_Any(),
    new Edr.BrdEdr_Middleware_Auth(),
    new Edr.BrdEdr_Middleware_Log(),

]



export const BrdEdr_Resources: typeof Edr.Drash.Resource[] = [

    Edr.BrdEdr_FileResource_AnyAsset,
    Edr.BrdEdr_FileResource_AnyTemplate,

    BrdEdr_HtmlPageResource_Error,

    BrdEdr_HtmlPageResource_Home,
    BrdEdr_HtmlPageResource_Otp,
    BrdEdr_HtmlPageResource_Tools,

    BrdEdr_HtmlPageResource_Login,
    BrdEdr_HtmlPageResource_Logout,
    BrdEdr_HtmlReservedPageResource_User,
    BrdEdr_HtmlReservedPageResource_Admin,
    BrdEdr_HtmlReservedPageResource_Log,
    BrdEdr_HtmlReservedPageResource_LogEntry,
    
    BrdEdr_RestApiResource_Test

];

