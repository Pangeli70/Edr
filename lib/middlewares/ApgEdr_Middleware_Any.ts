/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20230710 New implementation
 * @version 0.4 APG 20240726 English comments
 * @version 0.5 APG 20241107 Request class and better logging
 * ----------------------------------------------------------------------------
 */

import {
    Drash,
    Uts
} from "../deps.ts";
import {
    ApgEdr_eCookie
} from "../enums/ApgEdr_eCookie.ts";

import {
    ApgEdr_Request
} from "../classes/ApgEdr_Request.ts";
import {
    ApgEdr_Service
} from "../services/ApgEdr_Service.ts";


/**
 * Middleware for all requests
 */
export class ApgEdr_Middleware_Any extends Drash.Service {


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

        const edr = ApgEdr_Service.GetEdr(request);

        edr.totalTime = (performance.now() - edr.startTime);

        const totalTime = edr.totalTime.toFixed(2) + 'ms';

        if (typeof response.body === 'string') {

            response.body = response.body.replace("<<PROC_TIME>>", totalTime);

        }


        // Renew the telemetry id cookie
        const cookie: Uts.Std.Cookie = {
            name: ApgEdr_eCookie.TELEMETRY_ID,
            value: edr.telemetryId,
            path: '/',
            maxAge: ApgEdr_Service.MAX_TELEMETRY_TIME_SPAN,
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

