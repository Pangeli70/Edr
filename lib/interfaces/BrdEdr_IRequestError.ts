/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240704
 * ----------------------------------------------------------------------------
 */


/**
 * Dati per la gestione delle situazioni e le pagine di errore
 */
export interface BrdEdr_IRequestError {

    /** Numero di richiesta nella quale si è verificato l'errore */
    counter: number;

    /** Messaggio di errore */
    message: string;
}



