/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240728
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * ----------------------------------------------------------------------------
 */


import {
    Drash, Tng, Uts
} from "../../../deps.ts";
import {
    ApgEdr_Auth_eRole
} from "../../../enums/ApgEdr_Auth_eRole.ts";
import {
    ApgEdr_Route_eShared
} from "../../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_Service
} from "../../../services/ApgEdr_Service.ts";




export class ApgEdr_ReservedHtmlPageResource_Tng_Function extends Drash.Resource {

    readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;
    readonly PATH_PARAM_ID = 'id'

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_TNG_FUNCTION + "/:" + this.PATH_PARAM_ID];


    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdrRequest(request);
        if (!ApgEdr_Service.VerifyProtectedPage(edr, this.EDR_ROLE)) {
            this.redirect(ApgEdr_Route_eShared.PAGE_LOGIN, response);
            return;
        }

        const rawId = request.pathParam(this.PATH_PARAM_ID)!;

        const data = Tng.ApgTng_Service.GetFunctionFromCache(rawId);

        data.content = Uts.ApgUts.EscapeHTML(data.content.toString());

        (<any>data).backLink = ApgEdr_Route_eShared.RESERVED_PAGE_TNG_CACHES + "#Function_" + data.id;

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Tng function',
            "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Tng_Content_01.html",
        )

        templateData.page.data = data;

        await ApgEdr_Service.RenderPageUsingTng(
            request,
            response,
            templateData,
            {
                isCdnResource: true
            }
        );
    }





}
