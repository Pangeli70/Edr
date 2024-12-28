/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] Angeli Paolo Giusto
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
import { ApgEdr_Base_TngResource } from "../ApgEdr_Base_TngResource.ts";



enum _etranslations {

    GET_Intro_Label = "GET_Intro_Label",
    GET_Language_Options = "GET_Language_Options",
    GET_Select_Language = "GET_Select_Language",
    POST_Message = "POST_Message",
}



const _Translations = {
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
    [_etranslations.POST_Message]: {
        EN: "The site language has been changed to ",
        ES: "El idioma del sitio ha sido cambiado a ",
        DE: "Die Sprache des Sites wurde auf ",
        FR: "La langue du site a été changée à ",
        IT: "La lingua del sito è stata cambiata a ",
    },

}


const _Translator = new Uts.ApgUts_Translator(_Translations);



export class ApgEdr_TngResource_Language

    extends ApgEdr_Base_TngResource {

    override readonly RESOURCE_NAME = ApgEdr_TngResource_Language.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Select your language",
        ES: "Elija su idioma",
        DE: "Waehle deine Sprache",
        FR: "Choisissez votre langue",
        IT: "Seleziona la tua lingua",
    }
    override readonly TNG_TEMPLATES = {
        GET: "/pages/public/" + this.RESOURCE_NAME + ".html",
        POST: "/pages/public/" + this.RESOURCE_NAME + "_POST.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly BODY_PARAM_LANG = "lang";
    readonly MAX_COOKIE_AGE = 5 * 365 * 24 * 60 * 60;  // 5 years in seconds

    override paths = [ApgEdr_Route_eShared.PAGE_LANGUAGE];


    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
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

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
            this.TNG_TEMPLATES.POST,
            true
        )

        templateData.page.data = {
            okLink: ApgEdr_Route_eShared.PAGE_MENU_USER
        }
        templateData.page.translations = _Translator.getAll(edr.language);

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events)
        response.html(html);
    }



    #getCurrentLanguageOptions(aedr: ApgEdr_Request) {

        const r: string[] = [];

        const options = _Translations[_etranslations.GET_Language_Options];
        for (const lang in options) {
            const selected = lang === aedr.language ? " selected" : "";
            const caption = options[lang as Uts.ApgUts_TLanguage];
            r.push(`<option value="${lang}"${selected}>${caption}</option>`);
        }

        return r.join("\n");
    }

}