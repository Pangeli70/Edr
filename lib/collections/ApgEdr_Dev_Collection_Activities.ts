/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Log]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20241107
 * ----------------------------------------------------------------------------
 */

import {Mng} from "../deps.ts";
import {ApgEdr_Dev_IActivity} from "../interfaces/ApgEdr_Dev_IActivity.ts";


export interface ApgEdr_Dev_IActivity_Schema extends ApgEdr_Dev_IActivity { }

export class ApgEdr_Dev_Collection_Activities extends Mng.ApgMng_Collection<ApgEdr_Dev_IActivity_Schema> {

    protected override initClassName(): string {
        return ApgEdr_Dev_Collection_Activities.name
    }

}