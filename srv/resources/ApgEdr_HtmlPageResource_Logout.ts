/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * ----------------------------------------------------------------------------
 */

import {
    Edr
} from "../deps.ts";


export class ApgEdr_HtmlPageResource_Logout extends Edr.Drash.Resource {

    override paths = [Edr.ApgEdr_Route_eShared.PAGE_LOGOUT];


    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.ApgEdr_Service.GetEdrRequest(request);

        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'Log out',
            "/pages/ApgEdr_HtmlPageTemplate_Logout.html",
        )

        templateData.page.data= {
            okLink: "/"
        }

        response.headers.delete('Set-Cookie');
        const cookie = Edr.ApgEdr_Auth_Service.DeleteJwtCookie();
        response.setCookie(cookie);

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData, {
            isEdrSharedResource: true
        });

    }


}
