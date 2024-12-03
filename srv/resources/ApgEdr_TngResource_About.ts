/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241108 
 * ----------------------------------------------------------------------------
 */



import { Edr, Tng, Uts } from "../deps.ts";
import { ApgEdr_eRoutes } from "../enums/ApgEdr_eRoute.ts";


const title = { EN: "About", IT: "Informazioni" };

export class ApgEdr_TngResource_About

    extends Edr.ApgEdr_TngResource_Message {


    override readonly RESOURCE_NAME = ApgEdr_TngResource_About.name;
    override paths = [ApgEdr_eRoutes.PAGE_ABOUT];

    override readonly NEXT = ApgEdr_eRoutes.PAGE_HOME;
    override readonly TITLE = title;

    protected override async getHtml(alanguage: Uts.ApgUts_TLanguage) {

        const root = Tng.ApgTng_Service.TemplatesPath;

        const path = root + "/partials/ApgEdr_HtmlPagePartial_About_" + alanguage + ".html"

        let html = "";
        try {
            html = await Deno.readTextFile(path);
        } catch (_err) {
            console.dir(_err);
            html = "<p>Partial [" + path + "] not found</p>";
        }

        return html;
    }




}
