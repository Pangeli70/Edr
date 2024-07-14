/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20230710 New implementation
 * ----------------------------------------------------------------------------
 */

import {
    Drash,
    Uts
} from "../deps.ts";
import {
    BrdEdr_IRequest
} from "../interfaces/BrdEdr_IRequest.ts";
import {
    BrdEdr_Log_Service
} from "../services/BrdEdr_Log_Service.ts";
import {
    BrdEdr_Service
} from "../services/BrdEdr_Service.ts";


/**
 * Middleware per tutte le richieste
 */
export class BrdEdr_Middleware_Any extends Drash.Service {

    private static _counter = 0;


    public runBeforeResource(
        request: Drash.Request,
        _response: Drash.Response,
    ): void {

        BrdEdr_Middleware_Any._counter++;

        const edr: BrdEdr_IRequest = {
            counter: BrdEdr_Middleware_Any._counter,
            startTime: performance.now(),
            startMemory: (Uts.BrdUts.GetMemoryUsageMb() as any).rss,
            received: new Date().toLocaleTimeString(),
            route: request.url,
            method: request.method,
            remoteAddr: request.conn_info.remoteAddr as Deno.NetAddr,
            events: [],
            totalTime: 0,
            endMemory: 0
        };

        (request as any).edr = edr;

        BrdEdr_Log_Service.LogDebug(edr, import.meta.url, this.runBeforeResource, 'Called');

        const message = `Injected edr into the Drash request for route: ${edr.method}:${edr.route}`;

        BrdEdr_Log_Service.Log(edr, Uts.BrdUts_eLogType.CALL, import.meta.url, this.runBeforeResource, message);
    }



    public runAfterResource(
        request: Drash.Request,
        response: Drash.Response
    ): void {

        const edr = BrdEdr_Service.GetEdrRequest(request);

        edr.totalTime = (performance.now() - edr.startTime);

        const totalTime = edr.totalTime.toFixed(2) + 'ms';

        if (typeof response.body === 'string') {

            response.body = response.body.replace("##PROC_TIME##", totalTime);

        }

        BrdEdr_Log_Service.LogDebug(edr, import.meta.url, this.runAfterResource, 'Called');

    }
}

