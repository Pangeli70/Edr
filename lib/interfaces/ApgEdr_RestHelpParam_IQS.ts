/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 202401056
 * ----------------------------------------------------------------------------
 */

/**
 * Definizione dell'help per i parametri della querystring della richiesta
 */
export interface ApgEdr_RestHelpParam_IQS {

    /** Nome del parametro */
    name: string;

    /** Valori ammessi per il parametro */
    values: string[];

    /** Descrizione del parametro */
    description: string[];
}


