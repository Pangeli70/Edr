/** -----------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/13] Deno Deploy Beta
 * @version 0.9.7 [APG 2023/05/08] Separation of concerns Lib/Srv
 * @version 1.0.0 [APG 2024/11/07] Moving fro apg-tst to Edr Deno V2
 * -----------------------------------------------------------------------
 */


import { Drash, Tng } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_eRoute } from "../../enums/ApgEdr_eRoute.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Service_TddSpec } from "../../services/ApgEdr_Service_TddSpec.ts";
import { ApgEdr_TngResource_Auth_Base } from "../ApgEdr_TngResource_Auth_Base.ts";
import { ApgEdr_Resources_Links } from "../data/ApgEdr_Resources_Links.ts";
import { ApgEdr_TngResource_Menu_Base } from "../ApgEdr_TngResource_Menu_Base.ts";



const NavBar = [
    ApgEdr_Resources_Links[ApgEdr_eRoute.PAGE_HOME],
    ApgEdr_Resources_Links[ApgEdr_eRoute.PAGE_MENU_DEV],
]



export class ApgEdr_Dev_TngResource_TDD_Suites

    extends ApgEdr_TngResource_Auth_Base {


    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_TDD_Suites.name;
    override readonly TITLE = "Spec suites";
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/public/" + ApgEdr_TngResource_Menu_Base.name + ".html"
    };
    
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;

    public override paths = [ApgEdr_eRoute.DEV_PAGE_TST_SUITES];



    public async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const links: Tng.ApgTng_IHyperlink[] = [];

        const specs = ApgEdr_Service_TddSpec.Suites();
        for (const spec of specs!) {
            const item: Tng.ApgTng_IHyperlink = {
                url: ApgEdr_eRoute.DEV_PAGE_TST_SUITE + "/" + spec,
                label: { EN: spec },
                isReserved: false
            };
            links.push(item);
        }


        const templateData = ApgEdr_Service_Core.GetTngData(edr, this, 'GET');

        const topMenu = this.getTranslatedLinks(NavBar, edr.language);


        templateData.page.data = {
            menu: this.getTranslatedLinks(links, 'EN'),
            topMenu
        };


        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events)
        response.html(html);
    }


}
