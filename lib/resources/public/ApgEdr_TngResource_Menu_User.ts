/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/11/08]
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Tng, Uts } from "../../deps.ts";
import { ApgEdr_eRoute } from "../../enums/ApgEdr_eRoute.ts";
import { ApgEdr_Resources_Links } from "../data/ApgEdr_Resources_Links.ts";
import { ApgEdr_TngResource_Menu_Base } from "../ApgEdr_TngResource_Menu_Base.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";



enum _etranslations {
    PAGE_TITLE = "PAGE_TITLE_GET_1",
}



const _Translator = new Uts.ApgUts_Translator(
    {
        [_etranslations.PAGE_TITLE]: {
            EN: "User features",
            IT: "Funzioni utente"
        },
    }
);


const ApgEdr_Menu_User = [
    ApgEdr_Resources_Links[ApgEdr_eRoute.PAGE_LANGUAGE],
    ApgEdr_Resources_Links[ApgEdr_eRoute.PAGE_REQ_SUPPORT],
    ApgEdr_Resources_Links[ApgEdr_eRoute.PAGE_LOGOUT]
]



const NavBar = [
    ApgEdr_Resources_Links[ApgEdr_eRoute.PAGE_HOME],
]



export class ApgEdr_TngResource_Menu_User

    extends ApgEdr_TngResource_Menu_Base {


    override readonly RESOURCE_NAME = ApgEdr_TngResource_Menu_User.name;
    override readonly TITLE = "User features"

    override readonly MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_User;
    override readonly TOP_MENU: Tng.ApgTng_IHyperlink[] = NavBar;

    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.ANONYMOUS;

    override paths = [ApgEdr_eRoute.PAGE_MENU_USER];


    override getPageTitle(alang: Uts.ApgUts_TLanguage) {
        return _Translator.get(_etranslations.PAGE_TITLE, alang);
    }

}
