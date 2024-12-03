/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 202401056
 * ----------------------------------------------------------------------------
 */

import {ApgEdr_RestHelp_IPayload} from "./ApgEdr_RestHelp_IPayload.ts";
import {ApgEdr_RestHelpParam_IQS} from "./ApgEdr_RestHelpParam_IQS.ts";


/**
 * Definizione dell'help per le route con chiamata in GET alla REST API
 */
export interface ApgEdr_RestHelpRoute_IGet {

    /** Parametri della querystring */
    qsParams?: ApgEdr_RestHelpParam_IQS[];

    /** Payload della risposta*/
    payload: ApgEdr_RestHelp_IPayload;
}
