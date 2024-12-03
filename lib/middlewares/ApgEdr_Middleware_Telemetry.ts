/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240929
 * @version 0.2 APG 20241107 Better logging
 * ----------------------------------------------------------------------------
 */

import {Drash, Uts} from "../deps.ts";
import {ApgEdr_Service} from "../services/ApgEdr_Service.ts";
import {ApgEdr_Telemetry_Service} from "../services/ApgEdr_Telemetry_Service.ts";





/**
 * Middleware for requests telemetry
 */
export class ApgEdr_Middleware_Telemetry extends Drash.Service {




    override runBeforeResource(
        request: Drash.Request,
        _response: Drash.Response,
    ): void {

        const edr = ApgEdr_Service.GetEdr(request);
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

        const edr = ApgEdr_Service.GetEdr(request);

        const r = await ApgEdr_Telemetry_Service.Send(edr);

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






