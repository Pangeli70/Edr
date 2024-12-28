/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0.0 [APG 2024/08/13] Cleanup
 * @version 1.0.1 [APG 2024/09/29] Telemetry
 * @version 1.0.2 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Edr } from "../deps.ts";

export const ApgEdr_Middlewares: Edr.Drash.Service[] = [

    new Edr.ApgEdr_Middleware_Any(),
    new Edr.ApgEdr_Middleware_Auth(),
    new Edr.ApgEdr_Middleware_Log(),
    new Edr.ApgEdr_Middleware_Telemetry(),

]