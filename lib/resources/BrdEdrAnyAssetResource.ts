/** ---------------------------------------------------------------------------
 * @module Brd/Edr
 * @author APG
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * ----------------------------------------------------------------------------
 */
import { Drash, Uts } from "../deps.ts";
import { BrdEdrService } from "../classes/BrdEdrService.ts";


export class BrdEdrAnyAssetResource extends Drash.Resource {

    // paths = ["/assets/.*\.(jpg|png|svg|css|js|gltf|glb|stl|Brd3Dv|ico)"];
    paths = ["/assets/.*"];

    public GET(request: Drash.Request, response: Drash.Response) {

        const realFile = new URL(request.url).pathname;

        const ext = Uts.Std.Path.extname(realFile);

        // TODO FIX THIS!!!!! Set up proper cashing strategy for every type of asset -- APG 20230725

        if (
            ext === ".js" ||
            ext === ".css" ||
            ext === ".ico" ||
            ext === ".glb" ||
            ext === ".gltf" ||
            ext === ".stl" ||
            ext === ".Brd3Dv"
        ) {
            if (BrdEdrService.ClientCacheMaxAge > 0) {
                const cacheControlValue = "max-age=" +  BrdEdrService.ClientCacheMaxAge.toString();
                response.headers.append("Cache-Control", cacheControlValue);
            }
        }

        return response.file(`${BrdEdrService.AssetsPath}${realFile}`);
    }
}