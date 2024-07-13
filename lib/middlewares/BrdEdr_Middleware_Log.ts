/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * ----------------------------------------------------------------------------
 */


import {
    BrdEdr_Log_Service
} from "../services/BrdEdr_Log_Service.ts";
import {
    BrdEdr_Service
} from "../services/BrdEdr_Service.ts";
import {
    Drash,
    Uts
} from "../deps.ts";


/**
 * Middleware per il log delle richieste
 */
export class BrdEdr_Middleware_Log extends Drash.Service {

    


    public runBeforeResource(
        request: Drash.Request,
        _response: Drash.Response,
    ): void {

        const edr = BrdEdr_Service.GetEdrRequest(request);
        BrdEdr_Log_Service.LogDebug(edr, import.meta.url, this.runBeforeResource, 'Called');

    }


    public runAfterResource(
        request: Drash.Request,
        _response: Drash.Response
    ): void {

        const edr = BrdEdr_Service.GetEdrRequest(request);

        edr.totalTime = (performance.now() - edr.startTime);
        edr.endMemory = (Uts.BrdUts.GetMemoryUsageMb() as any).rss;

        const totalTime = edr.totalTime.toFixed(2) + 'ms';
        const deltaMemory = (edr.endMemory - edr.startMemory).toFixed(2) + 'MB';

        const message = 'totalTime: ' + totalTime + ' deltaMemory: ' + deltaMemory;
        BrdEdr_Log_Service.Log(edr, Uts.BrdUts_eLogType.ANSW, import.meta.url, this.runAfterResource, message);
        
        BrdEdr_Log_Service.Store(edr);
    }
}

