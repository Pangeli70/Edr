/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240929
 * ----------------------------------------------------------------------------
 */

import {
    Drash, Uts
} from "../deps.ts";
import {
    ApgEdr_Log_Service
} from "../services/ApgEdr_Log_Service.ts";
import {
    ApgEdr_Service
} from "../services/ApgEdr_Service.ts";
import {
    ApgEdr_Telemetry_Service
} from "../services/ApgEdr_Telemetry_Service.ts";





/**
 * Middleware for requests telemetry
 */
export class ApgEdr_Middleware_Telemetry extends Drash.Service {




    override runBeforeResource(
        request: Drash.Request,
        _response: Drash.Response,
    ): void {

        const edr = ApgEdr_Service.GetEdrRequest(request);
        ApgEdr_Log_Service.LogDebug(
            edr,
            ApgEdr_Middleware_Telemetry.name,
            this.runBeforeResource,
            'Called'
        );

    }



    override async runAfterResource(
        request: Drash.Request,
        _response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdrRequest(request);

        const r = await ApgEdr_Telemetry_Service.Send(edr);

        ApgEdr_Log_Service.LogDebug(
            edr,
            ApgEdr_Middleware_Telemetry.name,
            this.runAfterResource,
            'Called'
        );

        if (r.ok) {
            const p = r.payload as number[];
            if (p) {
                const message = 'Sent to telemetry ' + p[0].toString() + ' requests to local DB and ' + p[1].toString() + ' requests to Atlas DB';
                ApgEdr_Log_Service.Log(
                    edr,
                    Uts.ApgUts_eEventType.TELE,
                    ApgEdr_Middleware_Telemetry.name,
                    this.runAfterResource,
                    message
                );
            }
        }
        else {
            console.error(r.messages);
        }

    };
}






