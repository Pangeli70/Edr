/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Log]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/11/07]
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Mng } from "../deps.ts";
import { ApgEdr_IRequest } from "../interfaces/ApgEdr_IRequest.ts";


export interface ApgEdr_IEdr_Schema extends ApgEdr_IRequest { }

export class ApgEdr_Collection_Telemetry extends Mng.ApgMng_Collection<ApgEdr_IEdr_Schema> {

    protected override initClassName(): string {
        return ApgEdr_Collection_Telemetry.name
    }

}