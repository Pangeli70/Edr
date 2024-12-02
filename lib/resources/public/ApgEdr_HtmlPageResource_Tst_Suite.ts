/** -----------------------------------------------------------------------
 * @module [apg-tst]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/13] Deno Deploy Beta
 * @version 0.9.7 [APG 2023/05/08] Separation of concerns Lib/Srv
 * -----------------------------------------------------------------------
 */

import { ApgEdr_Request } from "../../classes/ApgEdr_Request.ts";
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
import {
    ApgEdr_Shared_Links
} from "../data/ApgEdr_Resources_Links.ts";
import {
    ApgEdr_HtmlPageResource
} from "./ApgEdr_HtmlPageResource.ts";



export const NavBar = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_HOME],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_DEV],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_DEV_TST_SUITES],

]


export class ApgEdr_HtmlPageResource_Tst_Suite

    extends ApgEdr_HtmlPageResource {


    override readonly RESOURCE_NAME = ApgEdr_HtmlPageResource_Tst_Suite.name;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/ApgEdr_HtmlPageTemplate_Tst_Suite_GET_01.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly PATH_PARAM_SUITE = 'suite';

    public override paths = [ApgEdr_Route_eShared.PAGE_DEV_TST_SUITE + "/:" + this.PATH_PARAM_SUITE];



    public async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);
        const rawSuite = request.pathParam(this.PATH_PARAM_SUITE);

        const suites = ApgEdr_Tst_Service.Suites();
        if (!suites.includes(rawSuite!)) {
            throw new Error(`Suite ${rawSuite} not found`);
        }
        const suite = rawSuite!;

        const menu: Tng.ApgTng_IHyperlink[] = [];
        const results = ApgEdr_Tst_Service.Results(suite);

        for (let i = 0; i < results!.length; i++) {
            const res = results![i];
            const title = `Failed: ${res.failed}, Skipped: ${res.skipped}, Total: ${res.total}`;
            const item = {
                url: ApgEdr_Route_eShared.PAGE_DEV_TST_EXEC + "/" + suite + "/" + i.toString(),
                label: { EN: res.execution.toISOString() },
                title: { EN: title },
                isReserved: false
            };
            menu.push(item);
        }

        const flags = ApgEdr_Tst_Service.Flags(suite);

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Spec suite executions',
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const topMenu = this.getTranslatedLinks(NavBar, edr.language);



        templateData.page.data = {
            action: ApgEdr_Route_eShared.PAGE_DEV_TST_SUITE + "/" + suite,
            menu: this.getTranslatedLinks(menu, 'EN'),
            flags,
            topMenu
        };



        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events)
        response.html(html);
    }


    async POST(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);
        const rawSuite = request.pathParam(this.PATH_PARAM_SUITE);

        const suites = ApgEdr_Tst_Service.Suites();
        if (!suites.includes(rawSuite!)) {
            throw new Error(`Suite ${rawSuite} not found`);
        }
        const suite = rawSuite!;

        const r = await ApgEdr_Tst_Service.RunSuite(suite);

        if (r.ok) {
            this.redirect(ApgEdr_Route_eShared.PAGE_DEV_TST_SUITE + "/" + suite, response);
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
        ApgEdr_Service.HandleError(
            aedr,
            this.RESOURCE_NAME,
            amethodName,
        );

        this.logAndRedirectToErrorPage(aedr, amethodName, aresponse, arequest.url);

    }
}
