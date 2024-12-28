/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0.0 [APG 2024/11/08]
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Tng, Uts } from "../../deps.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Shared_Links } from "../data/ApgEdr_Resources_Links.ts";
import { ApgEdr_TngResource_Menu } from "./ApgEdr_TngResource_Menu.ts";



const ApgEdr_Menu_Dev = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.DEV_PAGE_TOOLS],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.DEV_PAGE_ERRORS],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.DEV_PAGE_REQUESTS],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.DEV_PAGE_ENVIRONMENT],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.DEV_PAGE_STATUS],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.DEV_PAGE_TELEMETRY_PURGE],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_DEV_TENGINE],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.DEV_PAGE_STORIES],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.DEV_PAGE_TST_SUITES],

]



const NavBar = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU],
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
