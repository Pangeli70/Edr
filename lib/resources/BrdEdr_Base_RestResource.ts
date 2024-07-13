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
    BrdEdr_RestRoute_eGetMode
} from "../enums/BrdEdr_RestRoute_eGetMode.ts";
import {
    BrdEdr_RestHelpRoute_I
} from "../interfaces/BrdEdr_RestHelpRoute_I.ts";




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
        r.updateTotalTime()

        response.json(r);
    }



    protected routeHelp() {

        const r: BrdEdr_RestHelpRoute_I = {
            route: "",
            description: ["Undefined route. Overwrite the RouteHelp method."],
            GET: {
                qsParams: [
                    {
                        name: BrdEdr_Base_RestResource.GET_QSP_MODE,
                        values: [
                            `${BrdEdr_RestRoute_eGetMode.HELP}`,
                            `${BrdEdr_RestRoute_eGetMode.PARAMS}`,
                            `${BrdEdr_RestRoute_eGetMode.RESULT}`
                        ],
                        description: []
                    },
                    {
                        name: BrdEdr_Base_RestResource.GET_QSP_TEST_NAME,
                        values: [
                            "Url encoded name of one of the tests.",
                            "Use the value [?] or any other invalid value to get the list ot the names of the possible tests"
                        ],
                        description: []
                    }
                ],
                payload: {
                    type: "",
                    description: []
                }
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
        let r = BrdEdr_RestRoute_eGetMode.RESULT;

        const rawMode = request.queryParam(BrdEdr_Base_RestResource.GET_QSP_MODE);

        if (
            rawMode == BrdEdr_RestRoute_eGetMode.PARAMS ||
            rawMode == BrdEdr_RestRoute_eGetMode.HELP
        ) {
            r = rawMode;
        }

        return r;
    }



    protected GET_isHelpMode(
        mode: BrdEdr_RestRoute_eGetMode,
        aresult: Uts.BrdUts_RestResult,
        response: Drash.Response
    ) {
        let r = false;
        if (mode == BrdEdr_RestRoute_eGetMode.HELP) {
            aresult.ok = false;
            aresult.message = 'The payload contains hints about how to use this route.';
            aresult.payload = {
                signature: "BrdEdr_IRestRouteHelp",
                data: this.routeHelp()
            }
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
            aresult.payload = {
                signature: "BrdEdr_IRestRouteHelp",
                data: this.routeHelp()
            }
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
            aresult.message = 
                `The requested test [${aname}] was not found or is not valid.` +
                `The names of the available tests are listed in the payload.`
            ;
            aresult.payload = {
                signature: "string[]",
                data: anames
            };
            this.end(aresult, response);
            r = true;
        }
        return r;
    }



    protected GET_isParamsMode(
        amode: BrdEdr_RestRoute_eGetMode,
        atestName: string,
        aparams: unknown,
        aresult: Uts.BrdUts_RestResult,
        response: Drash.Response
    ) {
        let r = false;
        if (amode == BrdEdr_RestRoute_eGetMode.PARAMS) {
            aresult.message = `The payload contains the parameters associated to the requested test [${atestName}] `;
            aresult.payload = {
                signature: "unknown",
                data: aparams
            };
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
            aresult.message =
                `Parameters are missing in the [body] of the [POST] request. ` +
                `Add to the body an object named [${aname}].` +
                `This object must fulfill the interface [${asignature}].`;
            this.end(aresult, response);
            r = true;
        }
        return r;
    }

}


