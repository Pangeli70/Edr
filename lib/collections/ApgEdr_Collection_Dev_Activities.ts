/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0.0 [APG 2024/11/07]
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Mng } from "../deps.ts";
import { ApgEdr_Dev_IActivity } from "../interfaces/ApgEdr_Dev_IActivity.ts";



export interface ApgEdr_Dev_IActivity_Schema extends ApgEdr_Dev_IActivity { }

export class ApgEdr_Collection_Dev_Activities extends Mng.ApgMng_Collection<ApgEdr_Dev_IActivity_Schema> {

    protected override initClassName(): string {
        return ApgEdr_Collection_Dev_Activities.name
    }

}