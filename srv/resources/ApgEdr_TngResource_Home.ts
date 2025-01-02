/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/09] Alpha version
 * @version 0.9.2 [APG 2023/04/16] Moved to its own microservice
 * @version 0.9.3 [APG 2024/01/06] Revamped
 * @version 1.0.0 [APG 2024/07/01] Cleanup
 * @version 1.0.1 [APG 2024/07/31] ApgEdr_Service.GetTemplateData
 * @version 1.0.2 [APG 2024/08/14] ApgEdr_Service.FilterLinksByLogin + MainMenu_01 template
 * @version 1.0.3 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { ApgEdr_Menu_Main } from "../data/ApgEdr_Menu_Main.ts";
import { Edr, Tng, Uts } from "../deps.ts";
import { ApgEdr_eRoutes } from "../enums/ApgEdr_eRoute.ts";



enum _etranslations {
    PAGE_TITLE = "PAGE_TITLE",
}



const _Translator = new Uts.ApgUts_Translator(
    {
        [_etranslations.PAGE_TITLE]: {
            EN: "Edr main menu",
            IT: "Menu principale Edr"
        },
    }
);



export class ApgEdr_TngResource_Home

    extends Edr.ApgEdr_TngResource_Menu_Base {
    

    override readonly RESOURCE_NAME = ApgEdr_TngResource_Home.name;
    override readonly TITLE = "Main menu";

    override readonly MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_Main;
    override readonly TOP_MENU: Tng.ApgTng_IHyperlink[] = [];
    
    override paths = ["/", ApgEdr_eRoutes.PAGE_HOME, Edr.ApgEdr_Route_eShared.PAGE_MENU];


    override getPageTitle(alang: Uts.ApgUts_TLanguage) {
        return _Translator.get(_etranslations.PAGE_TITLE, alang);
    }

}
