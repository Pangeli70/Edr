/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240807
 * @version 1.1 APG 20240813 Moved to lib
 * @version 1.2 APG 20240902 Better permissions management
 * ----------------------------------------------------------------------------
 */

import { Drash, Tng, Uts } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";



export class ApgEdr_Dev_TngResource_Environment

    extends ApgEdr_Auth_TngResource {


    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_Environment.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Environment",
    }
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Environment_01.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly BODY_PARAM_ENV = "environment";
    readonly BODY_PARAM_USE_CDN = "useCdn";
    readonly BODY_PARAM_USE_TNG_CACHE = "useTngCache";

    override paths = [ApgEdr_Route_eShared.DEV_PAGE_ENVIRONMENT];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),  
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )


        templateData.page.data = {
            action: ApgEdr_Route_eShared.DEV_PAGE_ENVIRONMENT,
            useCdn: ApgEdr_Service_Core.UseCdn ? "checked" : "",
            useTngCache: Tng.ApgTng_Service.UseCache ? "checked" : "",
        }
        templateData.page.components = {
            selectEnv: this.#getSelectComponent_environment()
        }


        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }



    #getSelectComponent_environment() {

        const r: string[] = [];

        r.push(`<select id="${this.BODY_PARAM_ENV}" name="${this.BODY_PARAM_ENV}" required>`);
        r.push(`<option value="">...</option>`);

        const apgSelected = ApgEdr_Service_Core.DefaultFavicon == "ApgEdr_Favicon_Apg_2024_V01" ? "selected" : "";
        r.push(`<option value="Apg" ${apgSelected}>Apg</option>`);

        const bredaSelected = ApgEdr_Service_Core.DefaultFavicon == "ApgEdr_Favicon_Breda_2024_V01" ? "selected" : "";
        r.push(`<option value="Breda" ${bredaSelected}>Breda</option>`);

        r.push(`</select>`);

        return r.join("\n");

    }


    async POST(
        request: Drash.Request,
        response: Drash.Response
    ) {


        const rawEnv = await request.bodyParam(this.BODY_PARAM_ENV) as string;
        const rawUseCdn = await request.bodyParam(this.BODY_PARAM_USE_CDN) as string;
        const rawUseTngCache = await request.bodyParam(this.BODY_PARAM_USE_TNG_CACHE) as string;

        switch (rawEnv) {
            case "Breda":
                ApgEdr_Service_Core.DefaultFavicon = "ApgEdr_Favicon_Breda_2024_V01";
                ApgEdr_Service_Core.DefaultLogoJs = "ApgEdr_Logo3D_Breda_2024_V01";
                break
            default: // case "Apg":
                ApgEdr_Service_Core.DefaultFavicon = "ApgEdr_Favicon_Apg_2024_V01";
                ApgEdr_Service_Core.DefaultLogoJs = "ApgEdr_Logo3D_Apg_2024_V01";
                break;
        }

        ApgEdr_Service_Core.UseCdn = rawUseCdn === "on";
        Tng.ApgTng_Service.UseCache = rawUseTngCache === "on";

        this.redirect(ApgEdr_Route_eShared.PAGE_HOME, response);

    }



}