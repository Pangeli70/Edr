/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240701 Cleanup
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * ----------------------------------------------------------------------------
 */

import {
    Edr
} from "../../../deps.ts";
import {
    ApgEdr_eRoutes
} from "../../../enums/ApgEdr_eRoute.ts";



export class ApgEdr_ReservedHtmlPageResource_User extends Edr.Drash.Resource {

    override paths = [ApgEdr_eRoutes.RESERVED_PAGE_USER_TEST];

    readonly EDR_ROLE = Edr.ApgEdr_Auth_eRole.USER;

    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.ApgEdr_Service.GetEdrRequest(request);
        
        if (!Edr.ApgEdr_Service.VerifyProtectedPage(edr, this.EDR_ROLE)) {
            this.redirect(Edr.ApgEdr_Route_eShared.PAGE_LOGIN, response);
            return;
        }

        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'User page',
            "/pages/reserved/user/ApgEdr_ReservedHtmlPageTemplate_User.html",
        )

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData);
    }



}
