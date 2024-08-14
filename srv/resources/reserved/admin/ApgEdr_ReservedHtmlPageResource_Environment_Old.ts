/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240807
 * ----------------------------------------------------------------------------
 */


import {
    Edr,
    Tng,
} from "../../../deps.ts";



export class ApgEdr_ReservedHtmlPageResource_Environment extends Edr.Drash.Resource {

    readonly BODY_PARAM_ENV = "environment";
    readonly BODY_PARAM_USE_CDN = "useCdn";
    readonly BODY_PARAM_USE_TNG_CACHE = "useTngCache";

    override paths = [Edr.ApgEdr_Route_eShared.RESERVED_PAGE_ENVIRONMENT];


    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.ApgEdr_Service.GetEdrRequest(request);

        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'Environment',
            "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Environment_GET.html",
        )

        
        templateData.page.data = {
            action: Edr.ApgEdr_Route_eShared.RESERVED_PAGE_ENVIRONMENT,
            useCdn: Edr.ApgEdr_Service.UseCdn ? "checked" : "",
            useTngCache: Tng.ApgTng_Service.UseCache ? "checked" : "",
        }
        templateData.page.components = {
            selectEnv: this.#getSelectComponent_environment()
        }


        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData);
    }



    #getSelectComponent_environment() {

        const r: string[] = [];

        r.push(`<select id="${this.BODY_PARAM_ENV}" name="${this.BODY_PARAM_ENV}" required>`);
        r.push(`<option value="">...</option>`);
        
        const apgSelected = Edr.ApgEdr_Service.DefaultFavicon == "ApgEdr_Favicon_Apg_2024_V01" ? "selected" : "";
        r.push(`<option value="Apg" ${apgSelected}>Apg</option>`);
        
        const bredaSelected = Edr.ApgEdr_Service.DefaultFavicon == "ApgEdr_Favicon_Breda_2024_V01" ? "selected" : "";
        r.push(`<option value="Breda" ${bredaSelected}>Breda</option>`);
        
        r.push(`</select>`);

        return r.join("\n");

    }


    async POST(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {


        const rawEnv = await request.bodyParam(this.BODY_PARAM_ENV) as string;
        const rawUseCdn = await request.bodyParam(this.BODY_PARAM_USE_CDN) as string;
        const rawUseTngCache = await request.bodyParam(this.BODY_PARAM_USE_TNG_CACHE) as string;

        switch (rawEnv) {
            case "Breda":
                Edr.ApgEdr_Service.DefaultFavicon = "ApgEdr_Favicon_Breda_2024_V01";
                Edr.ApgEdr_Service.DefaultLogoJs = "ApgEdr_Logo3D_Breda_2024_V01";
                break
            default: // case "Apg":
                Edr.ApgEdr_Service.DefaultFavicon = "ApgEdr_Favicon_Apg_2024_V01";
                Edr.ApgEdr_Service.DefaultLogoJs = "ApgEdr_Logo3D_Apg_2024_V01";
                break;
        }

        Edr.ApgEdr_Service.UseCdn = rawUseCdn === "on";
        Tng.ApgTng_Service.UseCache = rawUseTngCache === "on";

        this.redirect("/", response);

    }



}