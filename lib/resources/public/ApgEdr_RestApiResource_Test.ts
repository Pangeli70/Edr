/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240106
 * @version 1.0 APG 20240701 Cleanup
 * ----------------------------------------------------------------------------
 */

import {
    Drash
} from "../../deps.ts";
import {
    ApgEdr_Service
} from "../../services/ApgEdr_Service.ts";
import {
    ApgEdr_RestResource
} from "./ApgEdr_RestResource.ts";
import {
    ApgEdr_Route_eShared
} from "../../enums/ApgEdr_Route_eShared.ts";



interface ApgEdr_ITest {
    name: string,
    param: number
};


const ApgEdr_Tests: ApgEdr_ITest[] = [
    { name: 'First', param: 1 },
    { name: 'Second', param: 2 }
];



/**
 * Route per testare la classe base Edr.ApgEdr_Base_RestResource
 */
export class ApgEdr_RestApiResource_Test extends ApgEdr_RestResource {


    public paths = [ApgEdr_Route_eShared.API_TEST];


    public GET(
        request: Drash.Request,
        response: Drash.Response
    ) {


        const r = this.begin(ApgEdr_Service.Microservice.name, request);

        const mode = this.GET_mode(request);

        if (this.GET_isHelpMode(mode, r, response))
            return;

        const rawTestName = request.queryParam(ApgEdr_RestApiResource_Test.GET_QSP_TEST_NAME);

        if (this.GET_testNameIsMissing(rawTestName, r, response))
            return;

        const names: string[] = [];
        for (const test of ApgEdr_Tests) {
            names.push(encodeURIComponent(test.name));
        }
        const testName = rawTestName!;
        const testIndex = ApgEdr_Tests.findIndex((v) => v.name == testName);

        if (this.GET_testWasNotFound(testIndex, testName, names, r, response))
            return;

        const params = ApgEdr_Tests[testIndex];

        if (this.GET_isParamsMode(mode, testName, params, r, response))
            return;

        r.payload = {
            signature: "string",
            data: this.#processRequest(params)
        }
        this.end(r, response);
    }




    public POST(
        request: Drash.Request,
        response: Drash.Response
    ) {


        const r = this.begin(ApgEdr_Service.Microservice.name, request);

        const rawParams = request.bodyParam(ApgEdr_RestApiResource_Test.POST_BP_PARAMS);

        if (this.POST_paramsAreMissing(rawParams, ApgEdr_RestApiResource_Test.POST_BP_PARAMS, 'ApgEdr_ITest', r, response))
            return;

        const params = rawParams as ApgEdr_ITest;

        r.payload = {
            signature: "string",
            data: this.#processRequest(params)
        }

        this.end(r, response);
    }




    #processRequest(aparams: ApgEdr_ITest) {
        return `Result: ${aparams.param.toString()}`
    }



    routeHelp() {
        const r = super.routeHelp();

        r.route = ApgEdr_Route_eShared.API_TEST;
        r.description = [
            "Route to test the base class ApgEdr_Base_RestResource"
        ]

        r.GET!.qsParams![1].values.push(
            "Refer to the [ApgEdr_Tests] list."
        )

        r.POST!.bodyParams[0].type = "ApgEdr_ITest";
        r.POST!.bodyParams[0].description.push(
            "A simple data structure to be used for the test"
        )

        return r;
    }





}


