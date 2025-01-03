/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/09] Alpha version
 * @version 0.9.2 [APG 2023/04/16] Moved to its own microservice
 * @version 0.9.3 [APG 2024/10/07] Max asset size
 * @version 0.9.4 [APG 2024/11/07] Better logging
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Drash, Uts } from "../../deps.ts";
import { ApgEdr_eRoute } from "../../enums/ApgEdr_eRoute.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";



/**
 * Serves any file from the local assets folder
 * It uses the cache-control header to limit the amount of times the file is requested
 * from the browser.
 * It uses the max size of the file to raise an error in order to prevent high load traffic
 * and prompt to move the asset to a CDN
 */
export class ApgEdr_FileResource_AnyAsset extends Drash.Resource {

    override paths = [ApgEdr_eRoute.FILE_ANY_ASSET];


    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const root = ApgEdr_eRoute.FILE_ANY_ASSET.replace("/*", "")
        const rawFile = new URL(request.url).pathname;
        const realFile = rawFile.replace(root, "");

        const ext = Uts.Std.Path.extname(realFile);

        if (
            ext === ".js" ||
            ext === ".css" ||
            ext === ".ico" ||
            ext === ".jpg" ||
            ext === ".png" ||
            ext === ".svg" ||
            ext === ".glb" ||
            ext === ".gltf" ||
            ext === ".stl"
        ) {
            if (ApgEdr_Service_Core.ServedAssets_ClientCache_MaxAge > 0) {
                const cacheControlValue = "max-age=" + ApgEdr_Service_Core.ServedAssets_ClientCache_MaxAge.toString();
                response.headers.append("Cache-Control", cacheControlValue);
            }
        }

        const fullPath = `${ApgEdr_Service_Core.LocalAssetsPath}${realFile}`;
        const file = await Deno.open(fullPath, { read: true });
        const info = await file.stat()
        const size = info.size / 1024 / 1024;
        if (size > ApgEdr_Service_Core.MaxAssetSize) {
            const edr = ApgEdr_Service_Core.GetEdr(request);
            const message = `The file "${realFile}" is larger than the maximum allowed size of ${ApgEdr_Service_Core.MaxAssetSize} MB.`;
            edr.LogError(
                ApgEdr_FileResource_AnyAsset.name, this.GET.name, message
            )
        }

        return response.file(fullPath);
    }
}