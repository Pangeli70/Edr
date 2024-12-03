/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Log]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20241107
 * ----------------------------------------------------------------------------
 */

import {Mng} from "../deps.ts";
import {ApgEdr_IRequest} from "../interfaces/ApgEdr_IRequest.ts";


export interface ApgEdr_IEdr_Schema extends ApgEdr_IRequest { }

export class ApgEdr_Collection_Telemetry extends Mng.ApgMng_Collection<ApgEdr_IEdr_Schema> {

    protected override initClassName(): string {
        return ApgEdr_Collection_Telemetry.name
    }

}