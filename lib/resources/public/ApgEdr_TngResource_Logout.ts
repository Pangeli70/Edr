/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] ANGELI Paolo Giusto
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
import { ApgEdr_TngResource_Base } from "../ApgEdr_TngResource_Base.ts";
import { ApgEdr_TngResource_Message_Base } from "../ApgEdr_TngResource_Message_Base.ts";


enum _eTranslation {
    PAGE_TITLE = "PAGE_TITLE",
    GET_Message = "GET_Message",
}


const _Translator = new Uts.ApgUts_Translator(
    {
        [_eTranslation.PAGE_TITLE]: {
            EN: "Logout",
            IT: "Uscita",
        },
        [_eTranslation.GET_Message]: {
            EN: "User has logged out",
            IT: "L'utente si è disconnesso",
        },

    }
)



export class ApgEdr_TngResource_Logout

    extends ApgEdr_TngResource_Base {


    override readonly RESOURCE_NAME = ApgEdr_TngResource_Logout.name;
    override readonly TITLE = "Logout";
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/public/" + ApgEdr_TngResource_Message_Base.name + ".html"
    };

    override paths = [ApgEdr_Route_eShared.PAGE_LOGOUT];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        const pageTitle = _Translator.get(_eTranslation.PAGE_TITLE, edr.language);

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            pageTitle,
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        templateData.page.data = {
            message: _Translator.get(_eTranslation.GET_Message, edr.language),
            okLink: "/"
        }

        response.headers.delete('Set-Cookie');
        const cookie = ApgEdr_Service_Auth.DeleteJwtCookie();
        response.setCookie(cookie);

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }


}
