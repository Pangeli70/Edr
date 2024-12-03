/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * @version 1.3 APG 20240902 Better permissions management
 * ----------------------------------------------------------------------------
 */


import { Drash, Uts } from "../../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service } from "../../../services/ApgEdr_Service.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";



export class ApgEdr_Auth_TngResource_Tng_Templates

    extends ApgEdr_Auth_TngResource {


    override readonly RESOURCE_NAME = ApgEdr_Auth_TngResource_Tng_Templates.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Tng templates",
    }
    override readonly EDR_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Tng_Templates_01.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_TNG_TEMPLATES];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;


        const pagesDir = ApgEdr_Service.LocalTemplatesPath;

        const data = await this.#getFilesRecursively(pagesDir);

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        templateData.page.data = data;

        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }



    async #getFilesRecursively(
        afolder: string,
        aroot = ""
    ) {

        const data: {
            url: string;
        }[] = [];

        const rootRoute = ApgEdr_Route_eShared.FILE_ANY_TEMPLATE.replace("/*", "");
        let rootDir = aroot
        if (rootDir == "") {
            rootDir = afolder
        }

        for await (const dirEntry of Deno.readDir(afolder)) {

            if (dirEntry.isDirectory) {
                const subfolder = `${afolder}/${dirEntry.name}`
                data.push(...await this.#getFilesRecursively(subfolder, rootDir));
            }

            else {
                const ext = dirEntry.name.split('.').pop();
                if (ext == 'html') {

                    const rawPath = `${afolder}/${dirEntry.name}`;
                    const filePath = rawPath.replace(rootDir, "")
                    data.push({
                        url: rootRoute + filePath,
                    });

                }
            }
        }
        return data;
    }
}
