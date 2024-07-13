/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 202401056
 * ----------------------------------------------------------------------------
 */

import {
  BrdEdr_RestHelpParam_IBody
} from "./BrdEdr_RestHelpParam_IBody.ts";
import {
  BrdEdr_RestHelp_IPayload
} from "./BrdEdr_RestHelp_IPayload.ts";


/**
 * Definizione dell'help per le route con chiamata in POST alla REST API
 */
export interface BrdEdr_RestHelpRoute_IPost {

  /** Parametri del body */
  bodyParams: BrdEdr_RestHelpParam_IBody[];

  /** Payload della risposta*/
  payload?: BrdEdr_RestHelp_IPayload;
}
