/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241113 Extracted from Home resource
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



export const ApgEdr_Menu_Dev_Test = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.API_TEST],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.RESERVED_PAGE_DEV_TEST_GUEST],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.RESERVED_PAGE_DEV_TEST_USER],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.RESERVED_PAGE_DEV_TEST_DEV],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.RESERVED_PAGE_DEV_TEST_ADMIN],

]



export const NavBar = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_HOME],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_DEV],

]



export class ApgEdr_HtmlPageResource_Menu_Dev_Test
    extends ApgEdr_HtmlPageResource_Menu {

    override paths = [ApgEdr_Route_eShared.PAGE_MENU_DEV_TEST];

    override readonly RESOURCE_NAME = ApgEdr_HtmlPageResource_Menu_Dev_Test.name;

    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Test",
        IT: "Prove"
    }


    override readonly MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_Dev_Test;

    override readonly TOP_MENU: Tng.ApgTng_IHyperlink[] = NavBar;


}
