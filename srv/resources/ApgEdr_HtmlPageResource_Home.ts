/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240701 Cleanup
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240814 ApgEdr_Service.FilterLinksByLogin + MainMenu_01 template
 * ----------------------------------------------------------------------------
 */


import {
    ApgEdr_Menu_Main
} from "../data/ApgEdr_Menu_Main.ts";
import {
    Edr, Tng, Uts
} from "../deps.ts";
import {
    ApgEdr_eRoutes
} from "../enums/ApgEdr_eRoute.ts";



export class ApgEdr_HtmlPageResource_Home
    extends Edr.ApgEdr_HtmlPageResource_Menu
{

    override paths = ["/", ApgEdr_eRoutes.PAGE_HOME];

    override readonly RESOURCE_NAME = ApgEdr_HtmlPageResource_Home.name;

    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Main menu",
        IT: "Menu principale"
    }

    override readonly MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_Main;

    override readonly TOP_MENU: Tng.ApgTng_IHyperlink[] = [];



}
