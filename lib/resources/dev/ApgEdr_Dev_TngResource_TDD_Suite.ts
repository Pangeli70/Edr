/** -----------------------------------------------------------------------
 * @module [apg-tst]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/13] Deno Deploy Beta
 * @version 0.9.7 [APG 2023/05/08] Separation of concerns Lib/Srv
 * -----------------------------------------------------------------------
 */

import { ApgEdr_Request } from "../../classes/ApgEdr_Request.ts";
import { Drash, Tng, Uts } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Service_TddSpec } from "../../services/ApgEdr_Service_TddSpec.ts";
import { ApgEdr_Shared_Links } from "../data/ApgEdr_Resources_Links.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";



 const NavBar = [
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_HOME],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_DEV],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.DEV_PAGE_TST_SUITES],
]


export class ApgEdr_Dev_TngResource_TDD_Suite

    extends ApgEdr_Auth_TngResource {


    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_TDD_Suite.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Spec's suite executions",
        IT: "Esecuzioni della suite di spec",
    }
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/ApgEdr_HtmlPageTemplate_Tst_Suite_GET_01.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly PATH_PARAM_SUITE = 'suite';

    public override paths = [ApgEdr_Route_eShared.DEV_PAGE_TST_SUITE + "/:" + this.PATH_PARAM_SUITE];



    public async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        const rawSuite = request.pathParam(this.PATH_PARAM_SUITE);

        const suites = ApgEdr_Service_TddSpec.Suites();
        if (!suites.includes(rawSuite!)) {
            throw new Error(`Suite ${rawSuite} not found`);
        }
        const suite = rawSuite!;

        const menu: Tng.ApgTng_IHyperlink[] = [];
        const results = ApgEdr_Service_TddSpec.Results(suite);

        for (let i = 0; i < results!.length; i++) {
            const res = results![i];
            const title = `Failed: ${res.failed}, Skipped: ${res.skipped}, Total: ${res.total}`;
            const item = {
                url: ApgEdr_Route_eShared.DEV_PAGE_TST_EXEC + "/" + suite + "/" + i.toString(),
                label: { EN: res.execution.toISOString() },
                title: { EN: title },
                isReserved: false
            };
            menu.push(item);
        }

        const flags = ApgEdr_Service_TddSpec.Flags(suite);

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const topMenu = this.getTranslatedLinks(NavBar, edr.language);



        templateData.page.data = {
            action: ApgEdr_Route_eShared.DEV_PAGE_TST_SUITE + "/" + suite,
            menu: this.getTranslatedLinks(menu, 'EN'),
            flags,
            topMenu
        };



        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events)
        response.html(html);
    }


    async POST(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        const rawSuite = request.pathParam(this.PATH_PARAM_SUITE);

        const suites = ApgEdr_Service_TddSpec.Suites();
        if (!suites.includes(rawSuite!)) {
            throw new Error(`Suite ${rawSuite} not found`);
        }
        const suite = rawSuite!;

        const r = await ApgEdr_Service_TddSpec.RunSuite(suite);

        if (r.ok) {
            this.redirect(ApgEdr_Route_eShared.DEV_PAGE_TST_SUITE + "/" + suite, response);
        }
        else {
            this.#handleError(edr, this.POST.name, request, response, r.messages);
        }

    }


    #handleError(
        aedr: ApgEdr_Request,
        amethodName: string,
        arequest: Drash.Request,
        aresponse: Drash.Response,
        amessages: string[],
    ) {

        aedr.message = {
            title: "Error running the test suite",
            text: amessages.join("<br>\n"),
            next: ApgEdr_Route_eShared.PAGE_MENU_DEV
        };
        // Log the error
        ApgEdr_Service_Core.HandleError(
            aedr,
            this.RESOURCE_NAME,
            amethodName,
        );

        this.logAndRedirectToErrorPage(aedr, amethodName, aresponse, arequest.url);

    }
}
