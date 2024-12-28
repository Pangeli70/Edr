/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2022/09/09] Alpha version
 * @version 0.9.2 [APG 2023/04/16] Moved to its own microservice
 * @version 0.9.3 [APG 2023/07/10] New implementation
 * @version 0.9.4 [APG 2023/07/26] Inject storage and english comments
 * @version 0.9.5 [APG 2024/11/07] Better logging
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Drash, Uts } from "../deps.ts";
import { ApgEdr_Service_Core } from "../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Service_Requests } from "../services/ApgEdr_Service_Requests.ts";


/**
 * Middleware for requests logging before telemetry
 */
export class ApgEdr_Middleware_Log extends Drash.Service {


    constructor() {
        super();
    }



    override runBeforeResource(
        request: Drash.Request,
        _response: Drash.Response,
    ): void {

        const edr = ApgEdr_Service_Core.GetEdr(request);
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

        const edr = ApgEdr_Service_Core.GetEdr(request);

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

        ApgEdr_Service_Requests.Store(edr)

    }
}

