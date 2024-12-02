/** -----------------------------------------------------------------------
 * @module [apg-tst]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/13] Deno Deploy Beta
 * -----------------------------------------------------------------------
 */
import {
    Drash,
    Tng
} from "../../deps.ts";
import {
    ApgEdr_Route_eShared
} from "../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_Service
} from "../../services/ApgEdr_Service.ts";
import {
    ApgEdr_Tst_Service
} from "../../services/ApgEdr_Tst_Service.ts";
import { ApgEdr_Shared_Links } from "../data/ApgEdr_Resources_Links.ts";
import {
    ApgEdr_HtmlPageResource
} from "./ApgEdr_HtmlPageResource.ts";




export const NavBar = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_HOME],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_DEV],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_DEV_TST_SUITES],

]


export class ApgEdr_HtmlPageResource_Tst_Specs 
    
    extends ApgEdr_HtmlPageResource {
    
    
    override readonly RESOURCE_NAME = ApgEdr_HtmlPageResource_Tst_Specs.name;
    override readonly TNG_TEMPLATES = {
    }

    public override paths = ["/specs/:framework/:specs"];



    public async GET(request: Drash.Request, response: Drash.Response) {

        const edr = ApgEdr_Service.GetEdr(request);

        const rawFramework = request.pathParam("framework") as string;
        const rawSpecs = request.pathParam("specs") as string;

        const menu: Tng.ApgTng_IHyperlink[] = [];
        const results = ApgEdr_Tst_Service.SpecResults(rawFramework!, rawSpecs!);
        for (let i = 0; i < results!.length; i++) {
            const item = {
                href: "/events/" + rawFramework + "/" + rawSpecs + "/" + i.toString(),
                caption: results[i].execution.toISOString()
            };
            menu.push(item);
        }


        const site = Dir.ApgDirEntries[Dir.eApgDirEntriesIds.tst];

        const templateData2 = {
            site: {
                name: site.caption,
                title: site.title
            },
            page: {
                title: "Stack of results for the " + rawFramework + "/" + rawSpecs + " specs",
                toolbar: "",
                released: "2022/12/13"
            },
            menuf
        };

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Language',
            "/pages/ApgEdr_HtmlPageTemplate_TST_Suite_GET_01.html",
        )

        const html = await ApgEdr_Service.RenderPageUsingTng(
            edr,
            templateData,
            {
                isCdnTemplate: true
            }
        );
        response.html(html);
    }


}
