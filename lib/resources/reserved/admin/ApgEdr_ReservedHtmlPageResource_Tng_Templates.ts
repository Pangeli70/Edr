/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * @version 1.3 APG 20240902 Better permissions management
 * ----------------------------------------------------------------------------
 */


import {
    Drash
} from "../../../deps.ts";
import {
    ApgEdr_Auth_eRole
} from "../../../enums/ApgEdr_Auth_eRole.ts";
import {
    ApgEdr_Route_eShared
} from "../../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_Service
} from "../../../services/ApgEdr_Service.ts";
import {
    ApgEdr_ReservedHtmlPageResource
} from "../ApgEdr_ReservedHtmlPageResource.ts";



export class ApgEdr_ReservedHtmlPageResource_Tng_Templates
    extends ApgEdr_ReservedHtmlPageResource {

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_TNG_TEMPLATES];

    override readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;
    override readonly RESOURCE_NAME = ApgEdr_ReservedHtmlPageResource_Tng_Templates.name;

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
            'Tng templates',
            "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Tng_Templates_01.html",
        )

        templateData.page.data = data;

        await ApgEdr_Service.RenderPageUsingTng(
            request,
            response,
            templateData,
            {
                isCdnTemplate: true
            }
        );
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
