/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 202401056
 * ----------------------------------------------------------------------------
 */


/**
 * Definizione dell'help per il payload contenuto nella risposta alla chiamata alla REST API
 */
export interface BrdEdr_RestHelp_IPayload {

    /** Tipo del payload */
    type: string;

    /** Descrizione del contenuto del payload */
    description: string[];
}



