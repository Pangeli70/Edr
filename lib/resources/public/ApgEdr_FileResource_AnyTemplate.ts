/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2024/07/02]
 * @version 0.9.2 [APG 2024/07/26] English comments
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Drash, Uts } from "../../deps.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";


/**
 * Serves any template from the local templates folder
 */
export class ApgEdr_FileResource_AnyTemplate extends Drash.Resource {


    override paths = [ApgEdr_Route_eShared.FILE_ANY_TEMPLATE];


    public GET(request: Drash.Request, response: Drash.Response) {

        const root = ApgEdr_Route_eShared.FILE_ANY_TEMPLATE.replace("/*", "")
        const rawFile = new URL(request.url).pathname;
        const realFile = rawFile.replace(root, "");

        const ext = Uts.Std.Path.extname(realFile);

        if (
            ext === ".html"
        ) {
            if (ApgEdr_Service_Core.ServedAssets_ClientCache_MaxAge > 0) {
                const cacheControlValue = "max-age=" + ApgEdr_Service_Core.ServedAssets_ClientCache_MaxAge.toString();
                response.headers.append("Cache-Control", cacheControlValue);
            }
        }

        const file = `${ApgEdr_Service_Core.LocalTemplatesPath}${realFile}`
        return response.file(file);
    }
}