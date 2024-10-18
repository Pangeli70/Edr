/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240813 Cleanup
 * @version 1.1 APG 20240929 Telemetry
 * ----------------------------------------------------------------------------
 */

import {
    Edr
} from "../deps.ts";

export const ApgEdr_Middlewares: Edr.Drash.Service[] = [

    new Edr.ApgEdr_Middleware_Any(),
    new Edr.ApgEdr_Middleware_Auth(),
    new Edr.ApgEdr_Middleware_Log(),
    new Edr.ApgEdr_Middleware_Telemetry(),

]