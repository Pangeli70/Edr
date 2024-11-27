/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20241007 Max asset size
 * @version 0.3 APG 20241107 Better logging
 * ----------------------------------------------------------------------------
 */

import {
    Drash,
    Uts
} from "../../deps.ts";
import {
    ApgEdr_Route_eShared
} from "../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_Service
} from "../../services/ApgEdr_Service.ts";

/**
 * Serves any file from the local assets folder
 * It uses the cache-control header to limit the amount of times the file is requested
 * from the browser.
 * It uses the max size of the file to raise an error in order to prevent high load traffic
 * and prompt to move the asset to a CDN
 */
export class ApgEdr_FileResource_AnyAsset extends Drash.Resource {

    override paths = [ApgEdr_Route_eShared.FILE_ANY_ASSET];


    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const root = ApgEdr_Route_eShared.FILE_ANY_ASSET.replace("/*", "")
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
            if (ApgEdr_Service.ServedAssets_ClientCache_MaxAge > 0) {
                const cacheControlValue = "max-age=" + ApgEdr_Service.ServedAssets_ClientCache_MaxAge.toString();
                response.headers.append("Cache-Control", cacheControlValue);
            }
        }

        const fullPath = `${ApgEdr_Service.LocalAssetsPath}${realFile}`;
        const file = await Deno.open(fullPath, { read: true });
        const info = await file.stat()
        const size = info.size / 1024 / 1024;
        if (size > ApgEdr_Service.MaxAssetSize) {
            const edr = ApgEdr_Service.GetEdr(request);
            const message = `The file "${realFile}" is larger than the maximum allowed size of ${ApgEdr_Service.MaxAssetSize} MB.`;
            edr.LogError(
                ApgEdr_FileResource_AnyAsset.name, this.GET.name, message
            )
        }

        return response.file(fullPath);
    }
}