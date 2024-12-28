/** ---------------------------------------------------------------------------
 * @module [ApgEdr_REST]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2024/01/06]
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { ApgEdr_RestHelp_IPayload } from "./ApgEdr_RestHelp_IPayload.ts";
import { ApgEdr_RestHelp_IQSParam } from "./ApgEdr_RestHelp_IQSParam.ts";


/**
 * Autodiscoverability help for a GET route of REST API
 */
export interface ApgEdr_RestHelp_IGetRoute {


    qsParams?: ApgEdr_RestHelp_IQSParam[];


    payload: ApgEdr_RestHelp_IPayload;
}
