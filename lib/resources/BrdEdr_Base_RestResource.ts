/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 202401056
 * ----------------------------------------------------------------------------
 */

import {
    Drash, Uts
} from "../deps.ts";
import {
    BrdEdr_eRestRouteGetMode
} from "../enums/BrdEdr_eRestRouteGetMode.ts";
import {
    BrdEdr_IRestRouteHelp
} from "../interfaces/BrdEdr_IRestRouteHelp.ts";




/**
 * Route generica per una REST API
 */
export class BrdEdr_Base_RestResource extends Drash.Resource {

    static readonly GET_QSP_MODE = 'Mode';
    static readonly GET_QSP_TEST_NAME = 'TestName';
    static readonly POST_BP_PARAMS = 'params';



    protected begin(amicroservice: string, request: Drash.Request) {
        const r = new Uts.BrdUts_RestResult(amicroservice);
        r.method = request.method;
        r.url = request.url;
        return r;
    }



    protected end(
        r: Uts.BrdUts_RestResult,
        response: Drash.Response
    ) {
        const totalTime = ((performance.now() - r.startTime) / 1000).toFixed(4);
        r.totalTime = totalTime;

        response.json(r);
    }



    protected routeHelp() {

        const r: BrdEdr_IRestRouteHelp = {
            route: "",
            description: "Undefined route. Overwrite the RouteHelp method. ",
            payload: {
                type: "",
                description: []
            },
            GET: {
                qsParams: [
                    {
                        name: BrdEdr_Base_RestResource.GET_QSP_MODE,
                        values: [
                            `${BrdEdr_eRestRouteGetMode.HELP}`,
                            `${BrdEdr_eRestRouteGetMode.PARAMS}`,
                            `${BrdEdr_eRestRouteGetMode.RESULT}`
                        ]
                    },
                    {
                        name: BrdEdr_Base_RestResource.GET_QSP_TEST_NAME,
                        values: [
                            "Url encoded name of one of the tests.",
                            "Use the value [?] or any other invalid value to get the list ot the names of the possible tests"
                        ]
                    }
                ],
            },
            POST: {
                bodyParams: [
                    {
                        name: BrdEdr_Base_RestResource.POST_BP_PARAMS,
                        type: "",
                        description: []
                    }
                ],
            }
        }

        return r;
    }


    protected GET_mode(
        request: Drash.Request
    ) {
        let r = BrdEdr_eRestRouteGetMode.RESULT;

        const rawMode = request.queryParam(BrdEdr_Base_RestResource.GET_QSP_MODE);

        if (
            rawMode == BrdEdr_eRestRouteGetMode.PARAMS ||
            rawMode == BrdEdr_eRestRouteGetMode.HELP
        ) {
            r = rawMode;
        }

        return r;
    }



    protected GET_isHelpMode(
        mode: BrdEdr_eRestRouteGetMode,
        aresult: Uts.BrdUts_RestResult,
        response: Drash.Response
    ) {
        let r = false;
        if (mode == BrdEdr_eRestRouteGetMode.HELP) {
            aresult.ok = false;
            aresult.message = 'The payload contains hints about how to use this route.';
            aresult.payload = this.routeHelp();
            this.end(aresult, response);
            r = true;
        }
        return r;
    }



    protected GET_testNameIsMissing(
        atestName: string | undefined,
        aresult: Uts.BrdUts_RestResult,
        response: Drash.Response
    ) {
        let r = false;
        if (!atestName) {
            aresult.ok = false;
            aresult.message = 'The payload contains hints about how to use this route.';
            aresult.payload = this.routeHelp();
            this.end(aresult, response);
            r = true;
        }
        return r;
    }



    protected GET_testWasNotFound(
        aindex: number,
        aname: string,
        anames: string[],
        aresult: Uts.BrdUts_RestResult,
        response: Drash.Response
    ) {
        let r = false;
        if (aindex == -1) {

            aresult.ok = false;
            aresult.message = [
                `The requested test [${aname}] was not found or is not valid.`,
                `The names of the available tests are listed in the payload.`
            ];
            aresult.payload = anames;
            this.end(aresult, response);
            r = true;
        }
        return r;
    }



    protected GET_isParamsMode(
        amode: BrdEdr_eRestRouteGetMode,
        atestName: string,
        aparams: unknown,
        aresult: Uts.BrdUts_RestResult,
        response: Drash.Response
    ) {
        let r = false;
        if (amode == BrdEdr_eRestRouteGetMode.PARAMS) {
            aresult.message = `The payload contains the parameters associated to the requested test [${atestName}] `;
            aresult.payload = aparams;
            this.end(aresult, response);
            r = true;
        }
        return r;
    }



    protected POST_paramsAreMissing(
        aparams: unknown,
        aname: string,
        asignature: string,
        aresult: Uts.BrdUts_RestResult,
        response: Drash.Response
    ) {
        let r = false;
        if (!aparams) {
            aresult.ok = false;
            aresult.message = [
                `Parameters are missing in the [body] of the [POST] request. ` +
                `Add to the body an object named [${aname}].`,
                `This object must fulfill the interface [${asignature}].`
            ];
            this.end(aresult, response);
            r = true;
        }
        return r;
    }

}


