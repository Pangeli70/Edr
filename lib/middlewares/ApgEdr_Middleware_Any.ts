/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20230710 New implementation
 * @version 0.4 APG 20240726 English comments
 * ----------------------------------------------------------------------------
 */

import {
    Drash,
    Uts
} from "../deps.ts";
import {
    ApgEdr_IRequest
} from "../interfaces/ApgEdr_IRequest.ts";
import {
    ApgEdr_Log_Service
} from "../services/ApgEdr_Log_Service.ts";
import {
    ApgEdr_Service
} from "../services/ApgEdr_Service.ts";


/**
 * Middleware for all requests
 */
export class ApgEdr_Middleware_Any extends Drash.Service {

    private static _counter = 0;


    override runBeforeResource(
        request: Drash.Request,
        _response: Drash.Response,
    ): void {

        ApgEdr_Middleware_Any._counter++;

        const edr: ApgEdr_IRequest = {
            counter: ApgEdr_Middleware_Any._counter,
            startTime: performance.now(),
            startMemory: (Uts.ApgUts.GetMemoryUsageMb() as any).rss,
            received: new Date().toLocaleTimeString(),
            route: request.url,
            method: request.method,
            remoteAddr: request.conn_info.remoteAddr as Deno.NetAddr,
            events: [],
            totalTime: 0,
            endMemory: 0,
            language: ApgEdr_Service.GetLanguage(request)
        };

        (request as any).edr = edr;

        ApgEdr_Log_Service.LogDebug(edr, import.meta.url, this.runBeforeResource, 'Called');

        const message = `Injected edr into the Drash request for route: ${edr.method}:${edr.route}`;

        ApgEdr_Log_Service.Log(edr, Uts.ApgUts_eLogType.CALL, import.meta.url, this.runBeforeResource, message);
    }



    override runAfterResource(
        request: Drash.Request,
        response: Drash.Response
    ): void {

        const edr = ApgEdr_Service.GetEdrRequest(request);

        edr.totalTime = (performance.now() - edr.startTime);

        const totalTime = edr.totalTime.toFixed(2) + 'ms';

        if (typeof response.body === 'string') {

            response.body = response.body.replace("<<PROC_TIME>>", totalTime);

        }

        ApgEdr_Log_Service.LogDebug(edr, import.meta.url, this.runAfterResource, 'Called');

    }
}

