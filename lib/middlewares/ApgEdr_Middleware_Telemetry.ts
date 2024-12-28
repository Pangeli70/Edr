/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2024/09/29]
 * @version 0.9.2 [APG 2024/11/07] Better logging
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import {Drash, Uts} from "../deps.ts";
import {ApgEdr_Service_Core} from "../services/ApgEdr_Service_Core.ts";
import {ApgEdr_Service_Telemetry} from "../services/ApgEdr_Service_Telemetry.ts";





/**
 * Middleware for requests telemetry
 */
export class ApgEdr_Middleware_Telemetry extends Drash.Service {




    override runBeforeResource(
        request: Drash.Request,
        _response: Drash.Response,
    ): void {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        edr.LogDebug(
            ApgEdr_Middleware_Telemetry.name,
            this.runBeforeResource.name,
            'Called'
        );

    }



    override async runAfterResource(
        request: Drash.Request,
        _response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);

        const r = await ApgEdr_Service_Telemetry.Send(edr);

        edr.LogDebug(
            ApgEdr_Middleware_Telemetry.name,
            this.runAfterResource.name,
            'Called'
        );

        if (r.ok) {
            const p = r.payload as number[];
            if (p) {
                const message = 'Sent to telemetry ' + p[0].toString() + ' requests to local DB and ' + p[1].toString() + ' requests to Atlas DB';
                edr.Log(
                    Uts.ApgUts_eEventType.TELE,
                    ApgEdr_Middleware_Telemetry.name,
                    this.runAfterResource.name,
                    message
                );
            }
        }
        else {
            console.error(r.messages);
        }

    };
}






