/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240728
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * ----------------------------------------------------------------------------
 */


import {
    Edr,
    Tng,
    Uts
} from "../../../deps.ts";




export class ApgEdr_ReservedHtmlPageResource_Tng_Function extends Edr.Drash.Resource {

    readonly EDR_ROLE = Edr.ApgEdr_Auth_eRole.ADMIN;
    readonly PATH_PARAM_ID = 'id'

    override paths = [Edr.ApgEdr_Route_eShared.RESERVED_PAGE_TNG_FUNCTION + "/:" + this.PATH_PARAM_ID];


    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.ApgEdr_Service.GetEdrRequest(request);
        if (!Edr.ApgEdr_Service.VerifyProtectedPage(edr, this.EDR_ROLE)) {
            this.redirect(Edr.ApgEdr_Route_eShared.PAGE_LOGIN, response);
            return;
        }

        const rawId = request.pathParam(this.PATH_PARAM_ID)!;

        const data = Tng.ApgTng_Service.GetFunctionFromCache(rawId);

        data.content = Uts.ApgUts.EscapeHTML(data.content.toString());

        (<any>data).backLink = Edr.ApgEdr_Route_eShared.RESERVED_PAGE_TNG_CACHES + "#Function_" + data.id;

        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'Tng function',
            "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Tng_File.html",
        )

        templateData.page.data = data;


        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData, {
            isCdnResource: true
        });
    }





}
