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
 * Risorsa del server Drash per servire qualsiasi template utilizzato dal BrdTng
 */
export class BrdEdr_FileResource_AnyTemplate extends Drash.Resource {

    paths = ["/templates/.*"];

    public GET(request: Drash.Request, response: Drash.Response) {

        const realFile = new URL(request.url).pathname.substring("/templates".length);

        const ext = Uts.Std.Path.extname(realFile);

        if (
            ext === ".html" 
        ) {
            if (BrdEdr_Service.ClientCacheMaxAge > 0) {
                const cacheControlValue = "max-age=" +  BrdEdr_Service.ClientCacheMaxAge.toString();
                response.headers.append("Cache-Control", cacheControlValue);
            }
        }

        const file = `${BrdEdr_Service.LocalTemplatesPath}${realFile}`
        return response.file(file);
    }
}