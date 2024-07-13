/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * ----------------------------------------------------------------------------
 */
import { Drash, Uts } from "../deps.ts";
import { BrdEdr_Service } from "../classes/BrdEdr_Service.ts";

/**
 * Risorsa del server Drash per servire qualsiasi file contenuto della cartella
 * assets
 */
export class BrdEdr_FileResource_AnyAsset extends Drash.Resource {

    // paths = ["/assets/.*\.(jpg|png|svg|css|js|gltf|glb|stl|Brd3Dv|ico)"];
    paths = ["/assets/.*"];

    public GET(request: Drash.Request, response: Drash.Response) {

        const realFile = new URL(request.url).pathname;

        const ext = Uts.Std.Path.extname(realFile);

        // FIXME Set up proper cashing strategy for every type of asset 
        // -- APG 20230725

        if (
            ext === ".js" ||
            ext === ".css" ||
            ext === ".ico" ||
            ext === ".glb" ||
            ext === ".gltf" ||
            ext === ".stl" ||
            ext === ".Brd3Dv"
        ) {
            if (BrdEdr_Service.ClientCacheMaxAge > 0) {
                const cacheControlValue = "max-age=" +  BrdEdr_Service.ClientCacheMaxAge.toString();
                response.headers.append("Cache-Control", cacheControlValue);
            }
        }

        const file = `${BrdEdr_Service.AssetsPath}${realFile}`
        return response.file(file);
    }
}