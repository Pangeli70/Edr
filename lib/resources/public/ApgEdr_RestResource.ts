/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 202401056
 * @version 0.2 APG 20240726 English comments
 * ----------------------------------------------------------------------------
 */

import {
    Drash, Uts
} from "../../deps.ts";
import {
    ApgEdr_RestRoute_eGetMode
} from "../../enums/ApgEdr_RestRoute_eGetMode.ts";
import {
    ApgEdr_RestHelpRoute_IData
} from "../../interfaces/ApgEdr_RestHelpRoute_IData.ts";




/**
 * REST API base resource
 */
export class ApgEdr_RestResource extends Drash.Resource {

    static readonly GET_QSP_MODE = 'Mode';
    static readonly GET_QSP_TEST_NAME = 'TestName';
    static readonly POST_BP_PARAMS = 'params';



    protected begin(amicroservice: string, request: Drash.Request) {
        const r = new Uts.ApgUts_RestResult(amicroservice);
        r.method = request.method;
        r.url = request.url;
        return r;
    }



    protected end(
        r: Uts.ApgUts_RestResult,
        response: Drash.Response
    ) {
        r.updateTotalTime()

        response.json(r);
    }



    protected routeHelp() {

        const r: ApgEdr_RestHelpRoute_IData = {
            route: "",
            description: ["Undefined route. Overwrite the RouteHelp method."],
            GET: {
                qsParams: [
                    {
                        name: ApgEdr_RestResource.GET_QSP_MODE,
                        values: [
                            `${ApgEdr_RestRoute_eGetMode.HELP}`,
                            `${ApgEdr_RestRoute_eGetMode.PARAMS}`,
                            `${ApgEdr_RestRoute_eGetMode.RESULT}`
                        ],
                        description: []
                    },
                    {
                        name: ApgEdr_RestResource.GET_QSP_TEST_NAME,
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
                        name: ApgEdr_RestResource.POST_BP_PARAMS,
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
        let r = ApgEdr_RestRoute_eGetMode.RESULT;

        const rawMode = request.queryParam(ApgEdr_RestResource.GET_QSP_MODE);

        if (
            rawMode == ApgEdr_RestRoute_eGetMode.PARAMS ||
            rawMode == ApgEdr_RestRoute_eGetMode.HELP
        ) {
            r = rawMode;
        }

        return r;
    }



    protected GET_isHelpMode(
        mode: ApgEdr_RestRoute_eGetMode,
        aresult: Uts.ApgUts_RestResult,
        response: Drash.Response
    ) {
        let r = false;
        if (mode == ApgEdr_RestRoute_eGetMode.HELP) {
            aresult.ok = false;
            aresult.message = 'The payload contains hints about how to use this route.';
            aresult.payload = {
                signature: "ApgEdr_IRestRouteHelp",
                data: this.routeHelp()
            }
            this.end(aresult, response);
            r = true;
        }
        return r;
    }



    protected GET_testNameIsMissing(
        atestName: string | undefined,
        aresult: Uts.ApgUts_RestResult,
        response: Drash.Response
    ) {
        let r = false;
        if (!atestName) {
            aresult.ok = false;
            aresult.message = 'The payload contains hints about how to use this route.';
            aresult.payload = {
                signature: "ApgEdr_IRestRouteHelp",
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
        aresult: Uts.ApgUts_RestResult,
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
        amode: ApgEdr_RestRoute_eGetMode,
        atestName: string,
        aparams: unknown,
        aresult: Uts.ApgUts_RestResult,
        response: Drash.Response
    ) {
        let r = false;
        if (amode == ApgEdr_RestRoute_eGetMode.PARAMS) {
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
        aresult: Uts.ApgUts_RestResult,
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


