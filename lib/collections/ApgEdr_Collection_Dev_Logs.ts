/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/11/07]
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Mng } from "../deps.ts";
import { ApgEdr_Dev_IEvent } from "../interfaces/ApgEdr_Dev_IEvent.ts";



export interface ApgEdr_Dev_ILogs_Schema extends ApgEdr_Dev_IEvent { }

export class ApgEdr_Collection_Dev_Logs extends Mng.ApgMng_Collection<ApgEdr_Dev_ILogs_Schema> {

    protected override initClassName(): string {
        return ApgEdr_Collection_Dev_Logs.name
    }

}