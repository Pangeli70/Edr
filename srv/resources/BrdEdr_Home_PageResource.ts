/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * ----------------------------------------------------------------------------
 */
import { Edr,  Tng , BrdEdr_Microservice} from "../deps.ts";

const BrdEdr_MainMenu = [
    { href: "/Brd/Edr/Tools", caption: "Tools", description: "Development tools" },
    { href: "/Brd/Edr/Test", caption: "Rest", description: "Test of the base REST resource" },
]

export class BrdEdr_Home_PageResource extends Edr.Drash.Resource {

    public paths = ["/"];

    public async GET(_request: Edr.Drash.Request, response: Edr.Drash.Response) {

        const tengineData = {
            siteName: BrdEdr_Microservice.name,
            siteTitle: BrdEdr_Microservice.description,
            pageTitle: 'Home page',
            links: BrdEdr_MainMenu
        }

        const html = await Tng.BrdTngService.Render(
            "/BrdEdr_Home_Page.html",
            tengineData
        ) as string;

        response.html(html);
    }
}
