/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 202401056
 * ----------------------------------------------------------------------------
 */

import {ApgEdr_RestHelpParam_IBody} from "./ApgEdr_RestHelpParam_IBody.ts";
import {ApgEdr_RestHelp_IPayload} from "./ApgEdr_RestHelp_IPayload.ts";


/**
 * Definizione dell'help per le route con chiamata in POST alla REST API
 */
export interface ApgEdr_RestHelpRoute_IPost {

    /** Parametri del body */
    bodyParams: ApgEdr_RestHelpParam_IBody[];

    /** Payload della risposta*/
    payload?: ApgEdr_RestHelp_IPayload;
}
