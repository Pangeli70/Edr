/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] ANGELI Paolo Giusto
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


    QS_PARAM_WRAP = "wrap";

    override paths = [ApgEdr_Route_eShared.FILE_ANY_TEMPLATE];


    public GET(request: Drash.Request, response: Drash.Response) {


        const rawWrap = request.queryParam(this.QS_PARAM_WRAP);



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

        const file = `${ApgEdr_Service_Core.LocalTemplatesPath}${realFile}`;

        if (rawWrap == "1") {
            const css = `
            <link
                rel="stylesheet"
                href="https://cdn.jsdelivr.net/npm/@picocss/pico@2/css/pico.classless.min.css"
            />`
            const pre = "<!DOCTYPE html>\n<head>\n" + css + "\n</head>\n<html>\n<body>";
            const content = Deno.readTextFileSync(file);
            const post = "\n</body>\n</html>";
            const html = pre + content + post;
            return response.html(html);
        }

        return response.file(file);
    }
}