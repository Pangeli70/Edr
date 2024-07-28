/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240728
 * ----------------------------------------------------------------------------
 */


import {
    ApgEdr_Microservice,
    Edr,
    Tng,
    Uts
} from "../deps.ts";




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

        const pageData: Tng.ApgTng_IPageData = {

            microservice: {
                name: ApgEdr_Microservice.name,
                title: ApgEdr_Microservice.description,
            },

            page: {
                assetsHost: Edr.ApgEdr_Service.GetAssetsHost(),
                master: "/master/ApgCdn_MasterPage_Application_V01.html",
                template: "/pages/ApgEdr_ReservedHtmlPageTemplate_Tng_File.html",
                title: 'Tng function',
                favicon: "Apg_2024_V01",
                logoJs: "Apg_2024_V01",
                rendered: new Date().toLocaleString(),
                data
            },

            user: Edr.ApgEdr_Service.GetUserData(edr)
        }

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, pageData, {
            isEdrSharedResource: true
        });
    }





}
