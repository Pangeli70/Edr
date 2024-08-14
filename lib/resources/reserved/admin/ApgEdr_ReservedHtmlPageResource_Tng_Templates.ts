/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
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



export class ApgEdr_ReservedHtmlPageResource_Tng_Templates extends Drash.Resource {

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_TNG_TEMPLATES];

    readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;

    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdrRequest(request);
        if (!ApgEdr_Service.VerifyProtectedPage(edr, this.EDR_ROLE)) {
            this.redirect(ApgEdr_Route_eShared.PAGE_LOGIN, response);
            return;
        }


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
                isCdnResource: true
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
