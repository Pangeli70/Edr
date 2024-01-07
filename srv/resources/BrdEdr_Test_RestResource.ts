/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240106
 * ----------------------------------------------------------------------------
 */



import {
    Edr,
    BrdEdr_Microservice,
} from "../deps.ts";

interface BrdEdr_ITest {
    name: string,
    param: number
};


const BrdEdr_Tests: BrdEdr_ITest[] = [
    { name: 'First', param: 1 },
    { name: 'Second', param: 2 }
];

const TEST_NAME_QSP = 'TestName';

const PARAMS_BP = 'params';


const RouteHelp: Edr.BrdEdr_IRestRouteHelp = {
    route: "/Brd/Edr/Test",
    description: [
        'Route to test the base class Edr.BrdEdr_Base_RestResource'
    ],
    GET: {
        qsParams: [
            {
                name: Edr.BrdEdr_Base_RestResource.MODE_QSP,
                values: [
                    `${Edr.BrdEdr_eRestRouteGetMode.HELP}`,
                    `${Edr.BrdEdr_eRestRouteGetMode.PARAMS}`,
                    `${Edr.BrdEdr_eRestRouteGetMode.RESULT}`
                ]
            },
            {
                name: TEST_NAME_QSP,
                values: [
                    "Url encoded name of one of the tests in the [BrdEdr_Tests] list.",
                    "Use the value [?] or any other invalid value to get the list ot the names of the possible tests"
                ]
            }
        ],
        payload: {
            type: "string",
            description: "A simple message from the test"
        }
    },
    POST: {
        bodyParams: [
            {
                name: PARAMS_BP,
                type: "BrdEdr_ITest",
                description: "A simple data structure to be used for the test"
            }
        ],
        payload: {
            type: "string",
            description: "A simple message from the test"
        }
    }
}


/**
 * Route per testare la classe base Edr.BrdEdr_Base_RestResource
 */
export class BrdEdr_Test_RestResource extends Edr.BrdEdr_Base_RestResource {


    public paths = [RouteHelp.route];


    #test(aparams: BrdEdr_ITest) {
        return `Result: ${aparams.param.toString()}`
    }

    public GET(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {

        const r = this.begin(BrdEdr_Microservice.name, request);

        const mode = this.Get_mode(request);
        if (this.GET_isHelpMode(mode, RouteHelp, r, response))
            return;

        const rawTestName = request.queryParam(TEST_NAME_QSP);
        if (this.GET_testNameIsMissing(rawTestName, RouteHelp, r, response))
            return;

        const testName = rawTestName!;
        const testIndex = BrdEdr_Tests.findIndex((v) => v.name == testName);
        const names: string[] = [];
        for (const test of BrdEdr_Tests) {
            names.push(encodeURIComponent(test.name));
        }
        if (this.GET_testWasNotFound(testIndex, testName, names, r, response))
            return;

        const params = BrdEdr_Tests[testIndex];
        if (this.GET_isParamsMode(mode, testName, params, r, response))
            return;

        r.payload = this.#test(params);
        this.end(r, response);
    }




    public POST(
        request: Edr.Drash.Request,
        response: Edr.Drash.Response
    ) {


        const r = this.begin(BrdEdr_Microservice.name, request);

        const rawParams = request.bodyParam(PARAMS_BP);

        if (this.POST_paramsAreMissing(rawParams, PARAMS_BP, 'BrdEdr_ITest', r, response))
            return;

        const params = rawParams as BrdEdr_ITest;

        r.payload = this.#test(params);

        this.end(r, response);
    }





}


