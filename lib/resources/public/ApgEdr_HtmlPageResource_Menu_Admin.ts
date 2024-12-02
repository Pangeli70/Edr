/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241108 Extracted from Home resource
 * ----------------------------------------------------------------------------
 */


import {
    Tng, Uts
} from "../../deps.ts";
import {
    ApgEdr_Route_eShared
} from "../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_Shared_Links
} from "../data/ApgEdr_Resources_Links.ts";
import {
    ApgEdr_HtmlPageResource_Menu
} from "./ApgEdr_HtmlPageResource_Menu.ts";



export const ApgEdr_Menu_Admin = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.RESERVED_PAGE_USERS],

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.RESERVED_PAGE_ERRORS],

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.RESERVED_PAGE_LOG],

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.RESERVED_PAGE_ENVIRONMENT],

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.RESERVED_PAGE_STATUS],

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.RESERVED_PAGE_TELEMETRY_PURGE],
]



export const NavBar = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU],

]



export class ApgEdr_HtmlPageResource_Menu_Admin
    extends ApgEdr_HtmlPageResource_Menu {

    override paths = [ApgEdr_Route_eShared.PAGE_MENU_ADMIN];

    override readonly RESOURCE_NAME = ApgEdr_HtmlPageResource_Menu_Admin.name;

    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Administrator features",
        IT: "Funzioni amministratore"
    }

    override readonly MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_Admin;

    override readonly TOP_MENU: Tng.ApgTng_IHyperlink[] = NavBar;

}
