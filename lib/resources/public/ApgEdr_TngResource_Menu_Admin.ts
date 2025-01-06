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



const ApgEdr_Menu_Admin = [
    ApgEdr_Resources_Links[ApgEdr_eRoute.ADMIN_PAGE_USERS],
]



const NavBar = [
    ApgEdr_Resources_Links[ApgEdr_eRoute.PAGE_MENU],
]



export class ApgEdr_TngResource_Menu_Admin
    
    extends ApgEdr_TngResource_Menu_Base {


    override readonly RESOURCE_NAME = ApgEdr_TngResource_Menu_Admin.name;
    override readonly TITLE = "Administrator features";
    override readonly MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_Admin;
    override readonly TOP_MENU: Tng.ApgTng_IHyperlink[] = NavBar;

    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.ADMIN;

    override paths = [ApgEdr_eRoute.PAGE_MENU_ADMIN];

}
