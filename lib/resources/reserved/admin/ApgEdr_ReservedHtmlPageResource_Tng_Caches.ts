/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * ----------------------------------------------------------------------------
 */


import {
    Drash, Tng
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



export class ApgEdr_ReservedHtmlPageResource_Tng_Caches extends Drash.Resource {

    readonly QS_PARAM_CACHE = 'Cache';
    readonly QS_PARAM_CACHE_CLEAR = 'clear';

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_TNG_CACHES];

    readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;

    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdrRequest(request);
        if (!ApgEdr_Service.VerifyProtectedPage(edr, this.EDR_ROLE)) {
            this.redirect(ApgEdr_Route_eShared.PAGE_LOGIN, response);
            return;
        }


        const rawCache = request.queryParam(this.QS_PARAM_CACHE);
        if(rawCache === this.QS_PARAM_CACHE_CLEAR) {
            Tng.ApgTng_Service.ClearCache();
        }


        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Tng caches',
            "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Tng_Caches_01.html",
        )

        templateData.page.data = Tng.ApgTng_Service.GetCaches();
        templateData.page.data.clearBtn = ApgEdr_Route_eShared.RESERVED_PAGE_TNG_CACHES + "?" + this.QS_PARAM_CACHE + "=" + this.QS_PARAM_CACHE_CLEAR;

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
