/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * ----------------------------------------------------------------------------
 */
import { Edr, Tng, Uts, BrdEdr_Microservice } from "../deps.ts";



export class BrdEdr_Tools_PageResource extends Edr.Drash.Resource {

    public paths = ["/Brd/Edr/Tools"];

    public async GET(_request: Edr.Drash.Request, response: Edr.Drash.Response) {

        const tengineData = {
            siteName: BrdEdr_Microservice.name,
            siteTitle: BrdEdr_Microservice.description,
            pageTitle: "Development tools",
            memoryUsageMb: Uts.BrdUts.GetMemoryUsageMb()
        }

        const html = await Tng.BrdTngService.Render(
            "/BrdEdr_Tools_Page.html",
            tengineData
        ) as string;

        response.html(html);
    }
}
