/** ---------------------------------------------------------------------------
 * @module Brd/Edr
 * @author APG
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * ----------------------------------------------------------------------------
 */
import { Edr,  Tng , BrdEdrMicroservice} from "../deps.ts";

const EdrMainMenu = [

    { href: "/tools", caption: "Tools", description: "Development tools" },
]

export class BrdEdrIndexResource extends Edr.Drash.Resource {

    public paths = ["/"];

    public async GET(_request: Edr.Drash.Request, response: Edr.Drash.Response) {

        const tengineData = {
            siteName: BrdEdrMicroservice.name,
            pageTitle: BrdEdrMicroservice.description,
            links: EdrMainMenu
        }

        const html = await Tng.BrdTngService.Render(
            "/index.html",
            tengineData
        ) as string;

        response.html(html);
    }
}
