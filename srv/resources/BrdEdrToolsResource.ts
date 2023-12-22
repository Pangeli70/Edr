/** ---------------------------------------------------------------------------
 * @module Brd/Edr
 * @author APG
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * ----------------------------------------------------------------------------
 */
import { Edr, Tng, Uts, BrdEdrMicroservice } from "../deps.ts";



export class BrdEdrToolsResource extends Edr.Drash.Resource {

    public paths = ["/tools"];

    public async GET(_request: Edr.Drash.Request, response: Edr.Drash.Response) {

        const tengineData = {
            siteName: BrdEdrMicroservice.name,
            pageTitle: "Development tools",
            memoryUsageMb: Uts.BrdUts.GetMemoryUsageMb()
        }

        const html = await Tng.BrdTngService.Render(
            "/tools.html",
            tengineData
        ) as string;

        response.html(html);
    }
}
