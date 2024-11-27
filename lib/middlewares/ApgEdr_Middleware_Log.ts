/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20230710 New implementation
 * @version 0.4 APG 20230726 Inject storage and english comments
 * @version 0.5 APG 20241107 Better logging
 * ----------------------------------------------------------------------------
 */

import {
    Drash,
    Uts
} from "../deps.ts";
import {
    ApgEdr_Service
} from "../services/ApgEdr_Service.ts";
import {
    ApgEdr_Log_Service
} from "../services/ApgEdr_Log_Service.ts";


/**
 * Middleware for requests logging and telemetry
 */
export class ApgEdr_Middleware_Log extends Drash.Service {




    constructor() {
        super();
    }



    override runBeforeResource(
        request: Drash.Request,
        _response: Drash.Response,
    ): void {

        const edr = ApgEdr_Service.GetEdr(request);
        edr.LogDebug(
            ApgEdr_Middleware_Log.name,
            this.runBeforeResource.name,
            'Called'
        );

    }



    override runAfterResource(
        request: Drash.Request,
        _response: Drash.Response
    ): void {

        const edr = ApgEdr_Service.GetEdr(request);

        edr.totalTime = (performance.now() - edr.startTime);
        edr.endMemory = Uts.ApgUts.GetMemoryUsageMb().rss;

        const totalTime = edr.totalTime.toFixed(2) + 'ms';
        const deltaMemory = (edr.endMemory - edr.startMemory).toFixed(2) + 'MB';

        const message = 'totalTime: ' + totalTime + ' deltaMemory: ' + deltaMemory;
        edr.Log(
            Uts.ApgUts_eEventType.ANSW,
            ApgEdr_Middleware_Log.name,
            this.runAfterResource.name,
            message
        );

        ApgEdr_Log_Service.Store(edr)

    }
}

