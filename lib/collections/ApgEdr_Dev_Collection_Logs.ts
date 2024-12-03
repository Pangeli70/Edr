/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Log]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20241107
 * ----------------------------------------------------------------------------
 */

import {Mng} from "../deps.ts";
import {ApgEdr_Dev_ILog} from "../interfaces/ApgEdr_Dev_IActivity.ts";


export interface ApgEdr_Dev_ILogs_Schema extends ApgEdr_Dev_ILog { }

export class ApgEdr_Dev_Collection_Logs extends Mng.ApgMng_Collection<ApgEdr_Dev_ILogs_Schema> {

    protected override initClassName(): string {
        return ApgEdr_Dev_Collection_Logs.name
    }

}