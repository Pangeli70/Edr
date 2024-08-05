/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240729
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * ----------------------------------------------------------------------------
 */


import {
    Edr,
    Uts
} from "../deps.ts";




export class ApgEdr_HtmlPageResource_Language extends Edr.Drash.Resource {

    readonly BODY_PARAM_LANG = "lang";
    readonly MAX_COOKIE_AGE = 5 * 365 * 24 * 60 * 60;  // 5 years in seconds

    override paths = [Edr.ApgEdr_Route_eShared.PAGE_LANGUAGE];


    async GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.ApgEdr_Service.GetEdrRequest(request);

        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'Language',
            "/pages/ApgEdr_HtmlPageTemplate_Language_GET.html",
        )

        templateData.page.data = {
            action: Edr.ApgEdr_Route_eShared.PAGE_LANGUAGE
        }
        templateData.page.translations = this.#getPageTranslations();

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData);
    }



    async POST(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const edr = Edr.ApgEdr_Service.GetEdrRequest(request);

        const rawLang = await request.bodyParam(this.BODY_PARAM_LANG) as string;

        const cookie: Uts.Std.Cookie = {
            name: Edr.ApgEdr_eCookie.LANGUAGE,
            value: rawLang,
            path: '/',
            maxAge: this.MAX_COOKIE_AGE,
            httpOnly: true
        };
        response.setCookie(cookie);

        edr.language = rawLang as Uts.ApgUts_TLanguage;

        const templateData = Edr.ApgEdr_Service.GetTemplateData(
            edr,
            'Language',
            "/pages/ApgEdr_HtmlPageTemplate_Language_POST.html"
        )

        templateData.page.data = {
            okLink: "/"
        }
        templateData.page.translations = this.#postPageTranslations();

        await Edr.ApgEdr_Service.RenderPageUsingTng(request, response, templateData);

    }


    #getPageTranslations() {
        const r: Record<string, Uts.ApgUts_IMultilanguage> = {
            intro: {
                EN: "Select your language",
                ES: "Elija su idioma",
                DE: "Waehle deine Sprache",
                FR: "Choisissez votre langue",
                IT: "Seleziona la tua lingua",
            },

        }
        return r;
    }

    #postPageTranslations() {
        const r: Record<string, Uts.ApgUts_IMultilanguage> = {
            intro: {
                EN: "The site language has been changed to ",
                ES: "El idioma del sitio ha sido cambiado a ",
                DE: "Die Sprache des Sites wurde auf ",
                FR: "La langue du site a été changée à ",
                IT: "La lingua del sito è stata cambiata a ",
            },

            language: {
                EN: "English",
                ES: "Español",
                DE: "Deutsch",
                FR: "Français",
                IT: "Italiano",
            }
        }
        return r;
    }
}