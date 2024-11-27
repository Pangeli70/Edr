/** -----------------------------------------------------------------------
 * @module [apg-tst]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/13] Deno Deploy Beta
 * @version 0.9.7 [APG 2023/05/08] Separation of concerns Lib/Srv
 * -----------------------------------------------------------------------
 */
import {
    Drash,
    Spc
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
    ApgEdr_HtmlPageResource
} from "./ApgEdr_HtmlPageResource.ts";


export class ApgEdr_HtmlPageResource_Tst_Exec
    extends ApgEdr_HtmlPageResource {

    override readonly RESOURCE_NAME = ApgEdr_HtmlPageResource_Tst_Exec.name;

    readonly PATH_PARAM_SUITE = 'suite';
    readonly PATH_PARAM_EXEC = 'index';
    public override paths = [ApgEdr_Route_eShared.PAGE_DEV_TST_EXEC + "/:" + this.PATH_PARAM_SUITE + "/:" + this.PATH_PARAM_EXEC];

    public async GET(request: Drash.Request, response: Drash.Response) {

        const edr = ApgEdr_Service.GetEdr(request);


        const rawSuite = request.pathParam(this.PATH_PARAM_SUITE) as string;
        const rawExec = request.pathParam(this.PATH_PARAM_EXEC) as string;

        const suites = ApgEdr_Tst_Service.Suites();
        if (!suites.includes(rawSuite!)) {
            throw new Error(`Suite ${rawSuite} not found`);
        }
        const suite = rawSuite!;

        const index = parseInt(rawExec) || -1;

        const result = ApgEdr_Tst_Service.SpecResultByIndex(suite, index);



        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Spec execution result',
            "/pages/ApgEdr_HtmlPageTemplate_Tst_Exec_GET_01.html",
        )

        templateData.page.data = {
            action: ApgEdr_Route_eShared.PAGE_DEV_TST_SUITE + "/" + suite,
            result
        };

        templateData.page.translations = {
            intro: 'Result of execution ' + rawExec + ' of the test suite ' + suite
        }


        await ApgEdr_Service.RenderPageUsingTng(
            request,
            response,
            templateData,
            {
                isCdnTemplate: true
            }
        );
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