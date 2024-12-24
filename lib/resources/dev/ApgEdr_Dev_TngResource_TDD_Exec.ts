/** -----------------------------------------------------------------------
 * @module [apg-tst]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/13] Deno Deploy Beta
 * @version 0.9.7 [APG 2023/05/08] Separation of concerns Lib/Srv
 * -----------------------------------------------------------------------
 */
import { Drash, Spc, Uts } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Service_TddSpec } from "../../services/ApgEdr_Service_TddSpec.ts";
import { ApgEdr_Shared_Links } from "../data/ApgEdr_Resources_Links.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";



export class ApgEdr_Dev_TngResource_TDD_Exec

    extends ApgEdr_Auth_TngResource {

    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_TDD_Exec.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: 'Spec execution result',
        IT: "Risultato esecuzione spec",
    }
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/ApgEdr_HtmlPageTemplate_Tst_Exec_GET_01.html",
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly PATH_PARAM_SUITE = 'suite';
    readonly PATH_PARAM_EXEC = 'index';

    public override paths = [
        ApgEdr_Route_eShared.DEV_PAGE_TST_EXEC + "/:" +
        this.PATH_PARAM_SUITE + "/:" +
        this.PATH_PARAM_EXEC
    ];



    public async GET(request: Drash.Request, response: Drash.Response) {

        const edr = ApgEdr_Service_Core.GetEdr(request);

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
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const NavBar = [

            ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_HOME],
            ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_DEV],
            ApgEdr_Shared_Links[ApgEdr_Route_eShared.DEV_PAGE_TST_SUITES],

        ]

        const suiteLink = Uts.ApgUts_Object.DeepCopy(ApgEdr_Shared_Links[ApgEdr_Route_eShared.DEV_PAGE_TST_SUITE])
        suiteLink.url += "/" + suite;
        NavBar.push(suiteLink);
        const topMenu = this.getTranslatedLinks(NavBar, edr.language);
        topMenu[3].label = suite;

        templateData.page.data = {
            topMenu,
            action: ApgEdr_Route_eShared.DEV_PAGE_TST_SUITE + "/" + suite,
            result
        };

        templateData.page.translations = {
            intro: 'Result of execution ' + rawExec + ' of the test suite ' + suite
        }


        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events)
        response.html(html);
    }



    #prepareResultForRendering(aresult: Spc.ApgSpc_TSpecResult) {

        const tests: { name: string; events: Spc.ApgSpc_IEvent[] }[] = [];

        let i = 0;
        do {
            const event = aresult.events[i];
            if (event.clause == Spc.ApgSpc_eClause.init) {
                const test = {
                    name: event.message,
                    events: [] as Spc.ApgSpc_IEvent[]
                }
                do {


                    i++;
                }
                while (i < aresult.events.length);
                tests.push(test);
            }
            i++;
        }
        while (i < aresult.events.length);
    }
}