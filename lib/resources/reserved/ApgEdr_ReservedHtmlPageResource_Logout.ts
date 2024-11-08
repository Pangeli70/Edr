/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * ----------------------------------------------------------------------------
 */

import {
    Drash
} from "../../deps.ts";
import {
    ApgEdr_Route_eShared
} from "../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_Auth_Service
} from "../../services/ApgEdr_Auth_Service.ts";
import {
    ApgEdr_Service
} from "../../services/ApgEdr_Service.ts";



export class ApgEdr_ReservedHtmlPageResource_Logout extends Drash.Resource {

    override paths = [ApgEdr_Route_eShared.PAGE_LOGOUT];


    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Log out',
            "/pages/reserved/ApgEdr_ReservedHtmlPageTemplate_Logout_01.html",
        )

        templateData.page.data= {
            okLink: "/"
        }

        response.headers.delete('Set-Cookie');
        const cookie = ApgEdr_Auth_Service.DeleteJwtCookie();
        response.setCookie(cookie);

        await ApgEdr_Service.RenderPageUsingTng(
            request,
            response,
            templateData,
            {
                isCdnTemplate: true
            }
        );

    }


}
