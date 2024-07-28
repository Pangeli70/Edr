/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20230710 New implementation
 * @version 0.4 APG 20230726 Inject storage and english comments
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
 * Middleware for requests logging and telemetry
 */
export class ApgEdr_Middleware_Log extends Drash.Service {


    private _storage: ApgEdr_IRequest[];


    constructor(astorage: ApgEdr_IRequest[]) {
        super();
        this._storage = astorage;
    }



    override runBeforeResource(
        request: Drash.Request,
        _response: Drash.Response,
    ): void {

        const edr = ApgEdr_Service.GetEdrRequest(request);
        ApgEdr_Log_Service.LogDebug(edr, import.meta.url, this.runBeforeResource, 'Called');

    }



    override runAfterResource(
        request: Drash.Request,
        _response: Drash.Response
    ): void {

        const edr = ApgEdr_Service.GetEdrRequest(request);

        edr.totalTime = (performance.now() - edr.startTime);
        edr.endMemory = (Uts.ApgUts.GetMemoryUsageMb() as any).rss;

        const totalTime = edr.totalTime.toFixed(2) + 'ms';
        const deltaMemory = (edr.endMemory - edr.startMemory).toFixed(2) + 'MB';

        const message = 'totalTime: ' + totalTime + ' deltaMemory: ' + deltaMemory;
        ApgEdr_Log_Service.Log(edr, Uts.ApgUts_eLogType.ANSW, import.meta.url, this.runAfterResource, message);

        this._storage.push(edr);
    }
}

