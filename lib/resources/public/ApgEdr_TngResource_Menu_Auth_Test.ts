/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/11/13]
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Tng } from "../../deps.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Shared_Links } from "../data/ApgEdr_Resources_Links.ts";
import { ApgEdr_TngResource_Menu_Base } from "../ApgEdr_TngResource_Menu_Base.ts";



const ApgEdr_Menu_Auth_Test = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.DEV_PAGE_AUTH_TEST_GUEST],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.DEV_PAGE_AUTH_TEST_USER],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.DEV_PAGE_AUTH_TEST_DEV],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.DEV_PAGE_AUTH_TEST_ADMIN],

]



const NavBar = [
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_HOME],
]



export class ApgEdr_TngResource_Menu_Auth_Test

    extends ApgEdr_TngResource_Menu_Base {


    override readonly RESOURCE_NAME = ApgEdr_TngResource_Menu_Auth_Test.name;
    override readonly TITLE = "Authorization Test";
    override readonly MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_Auth_Test;
    override readonly TOP_MENU: Tng.ApgTng_IHyperlink[] = NavBar;

    override paths = [ApgEdr_Route_eShared.PAGE_MENU_TEST_AUTH];

}
