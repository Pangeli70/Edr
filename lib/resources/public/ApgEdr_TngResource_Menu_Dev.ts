/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241108 Extracted from Home resource
 * ----------------------------------------------------------------------------
 */


import { Tng, Uts } from "../../deps.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Shared_Links } from "../data/ApgEdr_Resources_Links.ts";
import { ApgEdr_TngResource_Menu } from "./ApgEdr_TngResource_Menu.ts";



 const ApgEdr_Menu_Dev = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_DEV_TOOLS],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_DEV_TENGINE],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.RESERVED_PAGE_DEV_STORIES],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_DEV_TEST],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_DEV_TST_SUITES],

]



 const NavBar = [
    
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_HOME],
]



export class ApgEdr_TngResource_Menu_Dev
    extends ApgEdr_TngResource_Menu {

    override paths = [ApgEdr_Route_eShared.PAGE_MENU_DEV];

    override readonly RESOURCE_NAME = ApgEdr_TngResource_Menu_Dev.name;

    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Developer features",
        IT: "Funzioni sviluppatore"
    }


    override readonly MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_Dev;

    override readonly TOP_MENU: Tng.ApgTng_IHyperlink[] = NavBar;

}
