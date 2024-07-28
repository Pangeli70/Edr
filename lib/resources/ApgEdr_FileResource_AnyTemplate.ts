/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240702
 * @version 0.2 APG 20240726 English comments
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
 * Risorsa del server Drash per servire qualsiasi template utilizzato dal ApgTng
 */
export class ApgEdr_FileResource_AnyTemplate extends Drash.Resource {


    override paths = [ApgEdr_Route_eShared.FILE_ANY_TEMPLATE];
    

    public GET(request: Drash.Request, response: Drash.Response) {

        const realFile = new URL(request.url).pathname;

        const ext = Uts.Std.Path.extname(realFile);

        if (
            ext === ".html" 
        ) {
            if (ApgEdr_Service.ClientCacheMaxAge > 0) {
                const cacheControlValue = "max-age=" +  ApgEdr_Service.ClientCacheMaxAge.toString();
                response.headers.append("Cache-Control", cacheControlValue);
            }
        }

        const file = `${ApgEdr_Service.LocalTemplatesPath}${realFile}`
        return response.file(file);
    }
}