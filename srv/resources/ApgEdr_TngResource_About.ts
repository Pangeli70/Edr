/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/11/08]
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */



import { Edr, Tng, Uts } from "../deps.ts";


enum _etranslations {
    PAGE_TITLE = "PAGE_TITLE",
}



const _Translator = new Uts.ApgUts_Translator(
    {
        [_etranslations.PAGE_TITLE]: {
            EN: "About",
            IT: "Informazioni"
        },
    }
);



export class ApgEdr_TngResource_About

    extends Edr.ApgEdr_TngResource_Message_Base {


    override readonly RESOURCE_NAME = ApgEdr_TngResource_About.name;
    override readonly TITLE = "About";

    override readonly NEXT = Edr.ApgEdr_eRoute.PAGE_HOME;

    override paths = [Edr.ApgEdr_eRoute.PAGE_ABOUT];



    protected override async getHtml(alanguage: Uts.ApgUts_TLanguage) {

        const root = Tng.ApgTng_Service.TemplatesPath;

        const path = root + "/partials/ApgEdr_TngPartial_About_" + alanguage + ".html"

        let html = "";
        try {
            html = await Deno.readTextFile(path);
        } catch (_err) {
            console.dir(_err);
            html = "<p>Partial [" + path + "] not found</p>";
        }

        return html;
    }



    override getPageTitle(alang: Uts.ApgUts_TLanguage) {
        return _Translator.get(_etranslations.PAGE_TITLE, alang);
    }

}
