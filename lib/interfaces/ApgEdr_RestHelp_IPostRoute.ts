/** ---------------------------------------------------------------------------
 * @module [ApgEdr_REST]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2024/01/06]
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { ApgEdr_RestHelp_IBodyParam } from "./ApgEdr_RestHelp_IBodyParam.ts";
import { ApgEdr_RestHelp_IPayload } from "./ApgEdr_RestHelp_IPayload.ts";


/**
 * Autodiscoverability help for a POST route of REST API
 */
export interface ApgEdr_RestHelp_IPostRoute {


    bodyParams: ApgEdr_RestHelp_IBodyParam[];


    payload?: ApgEdr_RestHelp_IPayload;
}
