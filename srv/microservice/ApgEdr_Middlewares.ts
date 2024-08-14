/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240813 Cleanup
 * ----------------------------------------------------------------------------
 */

import {
    Edr
} from "../deps.ts";

export const ApgEdr_Middlewares: Edr.Drash.Service[] = [

    new Edr.ApgEdr_Middleware_Any(),
    new Edr.ApgEdr_Middleware_Auth(),
    new Edr.ApgEdr_Middleware_Log(Edr.ApgEdr_Service.Requests),

]