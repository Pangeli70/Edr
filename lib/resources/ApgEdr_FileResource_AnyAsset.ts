/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * ----------------------------------------------------------------------------
 */

import {
    Drash,
    Uts
} from "../deps.ts";
import {
    ApgEdr_Route_eShared
} from "../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_Service
} from "../services/ApgEdr_Service.ts";

/**
 * Risorsa del server Drash per servire qualsiasi file contenuto della cartella
 * assets
 */
export class ApgEdr_FileResource_AnyAsset extends Drash.Resource {

    // paths = ["/assets/.*\.(jpg|png|svg|css|js|gltf|glb|stl|Apg3Dv|ico)"];
    // paths = ["/assets/.*"];
    override paths = [ApgEdr_Route_eShared.FILE_ANY_ASSET];

    public GET(request: Drash.Request, response: Drash.Response) {

        const root = ApgEdr_Route_eShared.FILE_ANY_ASSET.replace("/*", "")
        const rawFile = new URL(request.url).pathname;
        const realFile = rawFile.replace(root, "");

        const ext = Uts.Std.Path.extname(realFile);

        // FIXME Set up proper cashing strategy for every type of asset 
        // -- APG 20230725

        if (
            ext === ".js" ||
            ext === ".css" ||
            ext === ".ico" ||
            ext === ".glb" ||
            ext === ".gltf" ||
            ext === ".stl"
        ) {
            if (ApgEdr_Service.ClientCacheMaxAge > 0) {
                const cacheControlValue = "max-age=" +  ApgEdr_Service.ClientCacheMaxAge.toString();
                response.headers.append("Cache-Control", cacheControlValue);
            }
        }

        const file = `${ApgEdr_Service.LocalAssetsPath}${realFile}`
        return response.file(file);
    }
}