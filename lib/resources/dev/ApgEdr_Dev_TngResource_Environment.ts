/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/08/07]
 * @version 1.0.1 [APG 2024/08/13] Moved to lib
 * @version 1.0.2 [APG 2024/09/02] Better permissions management
 * @version 1.0.3 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Drash, Tng } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_TngResource_Auth_Base } from "../ApgEdr_TngResource_Auth_Base.ts";
import { ApgEdr_Shared_Links } from "../data/ApgEdr_Resources_Links.ts";



const NavBar = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_HOME],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_DEV],

]



export class ApgEdr_Dev_TngResource_Environment

    extends ApgEdr_TngResource_Auth_Base {


    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_Environment.name;
    override readonly TITLE = "Environment settings";
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/dev/" + this.RESOURCE_NAME + ".html"
    };

    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;

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
            this.TITLE,
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const topMenu = this.getTranslatedLinks(NavBar, edr.language);

        templateData.page.data = {
            topMenu,
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

        this.redirect(ApgEdr_Route_eShared.PAGE_MENU_DEV, response);

    }



}