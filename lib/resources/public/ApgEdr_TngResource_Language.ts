/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/07/29]
 * @version 1.0.1 [APG 2024/07/31] ApgEdr_Service.GetTemplateData
 * @version 1.0.2 [APG 2024/08/13] Moved to lib
 * @version 1.0.3 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { ApgEdr_Request } from "../../classes/ApgEdr_Request.ts";
import { Drash, Uts } from "../../deps.ts";
import { ApgEdr_eCookieId } from "../../enums/ApgEdr_eCookieId.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_TngResource_Base } from "../ApgEdr_TngResource_Base.ts";
import { ApgEdr_TngResource_Message_Base } from "../ApgEdr_TngResource_Message_Base.ts";



enum _etranslations {
    GET_PageTitle = "GET_PageTitle",
    GET_Intro_Label = "GET_Intro_Label",
    GET_Language_Options = "GET_Language_Options",
    GET_Select_Language = "GET_Select_Language",
    POST_PageTitle = "POST_PageTitle",
    POST_Message = "POST_Message",
}


const _Translator = new Uts.ApgUts_Translator(
    {
        [_etranslations.GET_PageTitle]: {
            EN: "Select your language",
            ES: "Elija su idioma",
            DE: "Waehle deine Sprache",
            FR: "Choisissez votre langue",
            IT: "Seleziona la tua lingua",
        },
        [_etranslations.GET_Intro_Label]: {
            EN: "Language",
            ES: "Idioma",
            DE: "Sprache",
            FR: "Langue",
            IT: "Lingua",
        },
        [_etranslations.GET_Language_Options]: {
            EN: "English",
            ES: "Español",
            DE: "Deutsch",
            FR: "Français",
            IT: "Italiano",
        },
        [_etranslations.POST_PageTitle]: {
            EN: "Language changed",
            ES: "Idioma cambiado",
            DE: "Sprache geändert",
            FR: "Langue amodifiée",
            IT: "Lingua cambiata",
        },
        [_etranslations.POST_Message]: {
            EN: "The site language has been changed to ",
            ES: "El idioma del sitio ha sido cambiado a ",
            DE: "Die Sprache des Sites wurde auf ",
            FR: "La langue du site a été changée à ",
            IT: "La lingua del sito è stata cambiata a ",
        },

    }
);



export class ApgEdr_TngResource_Language

    extends ApgEdr_TngResource_Base {

    
    override readonly RESOURCE_NAME = ApgEdr_TngResource_Language.name;
    override readonly TITLE = "Choose language"
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/public/" + this.RESOURCE_NAME + ".html",
        POST: "/pages/public/" + ApgEdr_TngResource_Message_Base.name + ".html"
    };

    readonly BODY_PARAM_LANG = "lang";
    readonly MAX_COOKIE_AGE = 5 * 365 * 24 * 60 * 60;  // 5 years in seconds

    override paths = [ApgEdr_Route_eShared.PAGE_LANGUAGE];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        const pageTitle = _Translator.get(_etranslations.GET_PageTitle, edr.language);

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            pageTitle,
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        templateData.page.data = {
            action: ApgEdr_Route_eShared.PAGE_LANGUAGE,
            languageOptions: this.#getCurrentLanguageOptions(edr),
        }

        templateData.page.translations = {
            [_etranslations.GET_Intro_Label]: _Translator.get(_etranslations.GET_Intro_Label, edr.language)
        }

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }



    async POST(
        request: Drash.Request,
        response: Drash.Response
    ) {
        
        const edr = ApgEdr_Service_Core.GetEdr(request);
        
        const rawLang = await request.bodyParam(this.BODY_PARAM_LANG) as string;
        
        const cookie: Uts.Std.Cookie = {
            name: ApgEdr_eCookieId.LANGUAGE,
            value: rawLang,
            path: '/',
            maxAge: this.MAX_COOKIE_AGE,
            httpOnly: true
        };
        response.setCookie(cookie);
        
        edr.language = rawLang as Uts.ApgUts_TLanguage;
        const pageTitle = _Translator.get(_etranslations.POST_PageTitle, edr.language);
        
        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            pageTitle,
            this.TNG_TEMPLATES.POST,
            true
        )

        const translations = _Translator.getAll(edr.language);
        const message = translations[_etranslations.POST_Message] + "" + translations[_etranslations.GET_Language_Options]
        templateData.page.data = {
            okLink: ApgEdr_Route_eShared.PAGE_MENU_USER,
            message
        }

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events)
        response.html(html);
    }



    #getCurrentLanguageOptions(aedr: ApgEdr_Request) {

        const r: string[] = [];

        const options = _Translator.item(_etranslations.GET_Language_Options);
        for (const lang in options) {
            const selected = lang === aedr.language ? " selected" : "";
            const caption = options[lang as Uts.ApgUts_TLanguage];
            r.push(`<option value="${lang}"${selected}>${caption}</option>`);
        }

        return r.join("\n");
    }

}