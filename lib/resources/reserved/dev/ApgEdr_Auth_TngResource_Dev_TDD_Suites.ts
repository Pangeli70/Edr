/** -----------------------------------------------------------------------
 * @module [apg-tst]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/13] Deno Deploy Beta
 * @version 0.9.7 [APG 2023/05/08] Separation of concerns Lib/Srv
 * -----------------------------------------------------------------------
 */

import { Drash, Tng, Uts } from "../../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service } from "../../../services/ApgEdr_Service.ts";
import { ApgEdr_Tst_Service } from "../../../services/ApgEdr_Tst_Service.ts";
import { ApgEdr_Shared_Links } from "../../data/ApgEdr_Resources_Links.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";



const NavBar = [
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_HOME],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_DEV],
]



export class ApgEdr_Auth_TngResource_Dev_TDD_Suites

    extends ApgEdr_Auth_TngResource {


    override readonly RESOURCE_NAME = ApgEdr_Auth_TngResource_Dev_TDD_Suites.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Spec suites",
        IT: "Suite di spec",
    }
    override readonly EDR_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/ApgEdr_HtmlPageTemplate_Menu_GET_01.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    public override paths = [ApgEdr_Route_eShared.PAGE_DEV_TST_SUITES];



    public async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);

        const links: Tng.ApgTng_IHyperlink[] = [];

        const specs = ApgEdr_Tst_Service.Suites();
        for (const spec of specs!) {
            const item: Tng.ApgTng_IHyperlink = {
                url: ApgEdr_Route_eShared.PAGE_DEV_TST_SUITE + "/" + spec,
                label: { EN: spec },
                isReserved: false
            };
            links.push(item);
        }


        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const topMenu = this.getTranslatedLinks(NavBar, edr.language);


        templateData.page.data = {
            menu: this.getTranslatedLinks(links, 'EN'),
            topMenu
        };


        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events)
        response.html(html);
    }


}
