/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/07/08] Moving fro apg-tng to Edr
 * @version 1.0.1 [APG 2024/07/31] ApgEdr_Service.GetTemplateData
 * @version 1.0.2 [APG 2024/08/13] Moved to lib
 * @version 1.0.3 [APG 2024/09/02] Better permissions management
 * @version 1.0.4 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Drash } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_TngResource_Auth_Base } from "../ApgEdr_TngResource_Auth_Base.ts";
import { ApgEdr_Shared_Links } from "../data/ApgEdr_Resources_Links.ts";



const NavBar = [
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_HOME],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_DEV],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_DEV_TENGINE],
]



export class ApgEdr_Dev_TngResource_Tng_Templates

    extends ApgEdr_TngResource_Auth_Base {


    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_Tng_Templates.name;
    override readonly TITLE = "Local Tng templates";
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/dev/" + this.RESOURCE_NAME + ".html"
    };
    
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;

    override paths = [ApgEdr_Route_eShared.DEV_PAGE_TNG_TEMPLATES];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;


        const pagesDir = ApgEdr_Service_Core.LocalTemplatesPath;

        const localFiles = await this.#getFilesRecursively(pagesDir);

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            this.TITLE,
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const topMenu = this.getTranslatedLinks(NavBar, edr.language);

        templateData.page.data = {
            topMenu,
            localFiles
        };

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }



    async #getFilesRecursively(
        afolder: string,
        aroot = "",
        alevel = 0
    ) {

        const data: {
            isGroup: boolean;
            url: string;
            pre: string;
            file: string;
            label: string;
        }[] = [];

        const rootRoute = ApgEdr_Route_eShared.FILE_ANY_TEMPLATE.replace("/*", "");
        let rootDir = aroot
        if (rootDir == "") {
            rootDir = afolder
        }

        for await (const dirEntry of Deno.readDir(afolder)) {

            const rawPath = `${afolder}/${dirEntry.name}`;
            const filePath = rawPath.replace(rootDir, "")

            if (dirEntry.isDirectory) {
                const subfolder = `${afolder}/${dirEntry.name}`;
                data.push({
                    isGroup: true,
                    url: rootRoute + filePath, 
                    pre: "&nbsp;".repeat(alevel * 4),
                    file: subfolder,
                    label: dirEntry.name
                });
                data.push(...await this.#getFilesRecursively(subfolder, rootDir, alevel+1));
            }

            else {
                const ext = dirEntry.name.split('.').pop();
                if (ext == 'html') {

                    const rawPath = `${afolder}/${dirEntry.name}`;
                    const filePath = rawPath.replace(rootDir, "")
                    data.push({
                        isGroup: false,
                        url: rootRoute + filePath + "?wrap=1", 
                        pre: "&nbsp;".repeat(alevel * 4 + 2),
                        file: filePath,
                        label: filePath.split("/").pop()!
                    });

                }
            }
        }

        //data.sort((a, b) => a.file.localeCompare(b.file));


        return data;
    }
}
