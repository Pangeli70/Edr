/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/09] Alpha version
 * @version 0.9.2 [APG 2023/04/16] Moved to its own microservice
 * @version 0.9.3 [APG 2023/07/10] New implementation
 * @version 0.9.4 [APG 2024/07/26] English comments
 * @version 0.9.5 [APG 2024/11/07] Request class and better logging
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { ApgEdr_Request } from "../classes/ApgEdr_Request.ts";
import { Drash, Uts } from "../deps.ts";
import { ApgEdr_eCookieId } from "../enums/ApgEdr_eCookieId.ts";
import { ApgEdr_Service_Core } from "../services/ApgEdr_Service_Core.ts";


/**
 * Middleware for all requests
 */
export class ApgEdr_Middleware_Any extends Drash.Service {

    // TODO use global env const here --APG 20241224
    private static _deployment = Deno.env.get("DENO_DEPLOYMENT_ID") ?? "localhost";
    private static _counter = 0;


    override runBeforeResource(
        request: Drash.Request,
        _response: Drash.Response,
    ): void {

        ApgEdr_Middleware_Any._counter++;

        const edr = new ApgEdr_Request(
            request,
            ApgEdr_Middleware_Any._deployment,
            ApgEdr_Middleware_Any._counter
        );

        // deno-lint-ignore no-explicit-any
        (request as any).edr = edr;

        edr.LogDebug(
            ApgEdr_Middleware_Any.name,
            this.runBeforeResource.name,
            'Called'
        );

        const message = `Route: ${edr.method}:${edr.route}`;
        edr.Log(
            Uts.ApgUts_eEventType.CALL,
            ApgEdr_Middleware_Any.name,
            this.runBeforeResource.name,
            message
        );
    }



    override runAfterResource(
        request: Drash.Request,
        response: Drash.Response
    ): void {

        const edr = ApgEdr_Service_Core.GetEdr(request);

        edr.totalTime = (performance.now() - edr.startTime);

        const totalTime = edr.totalTime.toFixed(2) + 'ms';

        if (typeof response.body === 'string') {

            response.body = response.body.replace("<<PROC_TIME>>", totalTime);

        }


        // Renew the telemetry id cookie
        const cookie: Uts.Std.Cookie = {
            name: ApgEdr_eCookieId.TELEMETRY_ID,
            value: edr.telemetryId,
            path: '/',
            maxAge: ApgEdr_Service_Core.MAX_TELEMETRY_TIME_SPAN,
            httpOnly: true
        };

        response.setCookie(cookie);

        edr.LogDebug(
            ApgEdr_Middleware_Any.name,
            this.runAfterResource.name,
            'Called'
        );

    }
}

