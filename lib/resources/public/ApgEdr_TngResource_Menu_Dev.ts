/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/11/08]
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Tng } from "../../deps.ts";
import { ApgEdr_eRoute } from "../../enums/ApgEdr_eRoute.ts";
import { ApgEdr_Resources_Links } from "../data/ApgEdr_Resources_Links.ts";
import { ApgEdr_TngResource_Menu_Base } from "../ApgEdr_TngResource_Menu_Base.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";



const ApgEdr_Menu_Dev = [
    ApgEdr_Resources_Links[ApgEdr_eRoute.DEV_PAGE_TOOLS],
    ApgEdr_Resources_Links[ApgEdr_eRoute.DEV_PAGE_ERRORS],
    ApgEdr_Resources_Links[ApgEdr_eRoute.DEV_PAGE_REQUESTS],
    ApgEdr_Resources_Links[ApgEdr_eRoute.DEV_PAGE_ENVIRONMENT],
    ApgEdr_Resources_Links[ApgEdr_eRoute.DEV_PAGE_STATUS],
    ApgEdr_Resources_Links[ApgEdr_eRoute.DEV_PAGE_TELEMETRY_PURGE],
    ApgEdr_Resources_Links[ApgEdr_eRoute.PAGE_MENU_DEV_TENGINE],
    ApgEdr_Resources_Links[ApgEdr_eRoute.DEV_PAGE_STORIES],
    ApgEdr_Resources_Links[ApgEdr_eRoute.DEV_PAGE_TST_SUITES],
]



const NavBar = [
    ApgEdr_Resources_Links[ApgEdr_eRoute.PAGE_MENU],
]



export class ApgEdr_TngResource_Menu_Dev

    extends ApgEdr_TngResource_Menu_Base {

    override readonly RESOURCE_NAME = ApgEdr_TngResource_Menu_Dev.name;
    override readonly TITLE = "Developer features";
    override readonly MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_Dev;
    override readonly TOP_MENU: Tng.ApgTng_IHyperlink[] = NavBar;

    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;

    override paths = [ApgEdr_eRoute.PAGE_MENU_DEV];
}
