/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0.0 [APG 2024/07/08]
 * @version 1.0.1 [APG 2024/07/31] ApgEdr_Service.GetTemplateData
 * @version 1.0.2 [APG 2024/08/13] Moved to lib
 * @version 1.0.3 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Drash, Uts } from "../../deps.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Auth } from "../../services/ApgEdr_Service_Auth.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Base_TngResource } from "../ApgEdr_Base_TngResource.ts";


enum _eTranslation {
    GET_Message = "GET_Message",
}


const _Translator = new Uts.ApgUts_Translator(
    {

        [_eTranslation.GET_Message]: {
            EN: "User has logged out",
            IT: "L'utente si è disconnesso",
        },

    }
)



export class ApgEdr_TngResource_Logout
    
    extends ApgEdr_Base_TngResource {

    
    override readonly RESOURCE_NAME = ApgEdr_TngResource_Logout.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Logout",
        IT: "Uscita",
    }
    override readonly TNG_TEMPLATES = {
        GET: "/pages/public/" + this.RESOURCE_NAME + ".html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    override paths = [ApgEdr_Route_eShared.PAGE_LOGOUT];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        templateData.page.data = {
            okLink: "/"
        }
        templateData.page.translations = {
            [_eTranslation.GET_Message]: _Translator.get(_eTranslation.GET_Message, edr.language)
        }

        response.headers.delete('Set-Cookie');
        const cookie = ApgEdr_Service_Auth.DeleteJwtCookie();
        response.setCookie(cookie);

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }


}
