/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 202401056
 * ----------------------------------------------------------------------------
 */

import {
  BrdEdr_RestHelp_IPayload
} from "./BrdEdr_RestHelp_IPayload.ts";
import {
  BrdEdr_RestHelpParam_IQS
} from "./BrdEdr_RestHelpParam_IQS.ts";


/**
 * Definizione dell'help per le route con chiamata in GET alla REST API
 */
export interface BrdEdr_RestHelpRoute_IGet {

  /** Parametri della querystring */
  qsParams?: BrdEdr_RestHelpParam_IQS[];

  /** Payload della risposta*/
  payload: BrdEdr_RestHelp_IPayload;
}
