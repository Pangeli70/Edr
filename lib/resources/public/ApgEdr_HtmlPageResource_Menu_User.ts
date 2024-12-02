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



export const ApgEdr_Menu_User = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_LANGUAGE],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_REQ_SUPPORT],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_LOGOUT]

]



export const NavBar = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_HOME],

]



export class ApgEdr_HtmlPageResource_Menu_User
    extends ApgEdr_HtmlPageResource_Menu {

    override paths = [ApgEdr_Route_eShared.PAGE_MENU_USER];

    override readonly RESOURCE_NAME = ApgEdr_HtmlPageResource_Menu_User.name;

    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "User features",
        IT: "Funzioni utente"
    }

    override readonly MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_User;

    override readonly TOP_MENU: Tng.ApgTng_IHyperlink[] = NavBar;


}
