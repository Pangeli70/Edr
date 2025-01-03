/** -----------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/13] Deno Deploy Beta
 * @version 0.9.7 [APG 2023/05/08] Separation of concerns Lib/Srv
 * @version 1.0.0 [APG 2024/11/07] Moving fro apg-tst to Edr Deno V2
 * -----------------------------------------------------------------------
 */


import { Drash, Uts } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_eRoute } from "../../enums/ApgEdr_eRoute.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Service_TddSpec } from "../../services/ApgEdr_Service_TddSpec.ts";
import { ApgEdr_TngResource_Auth_Base } from "../ApgEdr_TngResource_Auth_Base.ts";
import { ApgEdr_Resources_Links } from "../data/ApgEdr_Resources_Links.ts";



export class ApgEdr_Dev_TngResource_TDD_Exec

    extends ApgEdr_TngResource_Auth_Base {
    

    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_TDD_Exec.name;
    override readonly TITLE = 'Spec execution result';
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/dev/" + this.RESOURCE_NAME + ".html"
    };

    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;

    readonly PATH_PARAM_SUITE = 'suite';
    readonly PATH_PARAM_EXEC = 'index';

    public override paths = [
        ApgEdr_eRoute.DEV_PAGE_TST_EXEC + "/:" +
        this.PATH_PARAM_SUITE + "/:" +
        this.PATH_PARAM_EXEC
    ];



    public async GET(request: Drash.Request, response: Drash.Response) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const rawSuite = request.pathParam(this.PATH_PARAM_SUITE) as string;
        const rawExec = request.pathParam(this.PATH_PARAM_EXEC) as string;

        const suites = ApgEdr_Service_TddSpec.Suites();
        if (!suites.includes(rawSuite!)) {
            throw new Error(`Suite ${rawSuite} not found`);
        }
        const suite = rawSuite!;

        const index = parseInt(rawExec) || -1;

        const result = ApgEdr_Service_TddSpec.SpecResultByIndex(suite, index);

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            this.TITLE,
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const NavBar = [

            ApgEdr_Resources_Links[ApgEdr_eRoute.PAGE_HOME],
            ApgEdr_Resources_Links[ApgEdr_eRoute.PAGE_MENU_DEV],
            ApgEdr_Resources_Links[ApgEdr_eRoute.DEV_PAGE_TST_SUITES],

        ]

        const suiteLink = Uts.ApgUts_Object.DeepCopy(ApgEdr_Resources_Links[ApgEdr_eRoute.DEV_PAGE_TST_SUITE])
        suiteLink.url += "/" + suite;
        NavBar.push(suiteLink);
        const topMenu = this.getTranslatedLinks(NavBar, edr.language);
        topMenu[3].label = suite;

        templateData.page.data = {
            topMenu,
            action: ApgEdr_eRoute.DEV_PAGE_TST_SUITE + "/" + suite,
            result
        };

        templateData.page.translations = {
            intro: 'Result of execution ' + rawExec + ' of the test suite ' + suite
        }


        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events)
        response.html(html);
    }


}