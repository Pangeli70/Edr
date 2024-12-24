/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * ----------------------------------------------------------------------------
 */

import { Drash, Uts } from "../../deps.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Auth } from "../../services/ApgEdr_Service_Auth.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Base_TngResource } from "../ApgEdr_Base_TngResource.ts";



export class ApgEdr_Auth_TngResource_Logout
    
    extends ApgEdr_Base_TngResource {

    
    override readonly RESOURCE_NAME = ApgEdr_Auth_TngResource_Logout.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Logout",
        IT: "Uscita",
    }
    override readonly TNG_TEMPLATES = {
        GET: "/pages/reserved/ApgEdr_ReservedHtmlPageTemplate_Logout_01.html"
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

        response.headers.delete('Set-Cookie');
        const cookie = ApgEdr_Service_Auth.DeleteJwtCookie();
        response.setCookie(cookie);

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }


}
