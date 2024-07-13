/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 202401056
 * ----------------------------------------------------------------------------
 */

/**
 * Modalità di gestione delle richieste in GET alla REST API
 */
export enum BrdEdr_RestRoute_eGetMode {

    /** La risposta contiene l'help per l'utilizzo della API */
    HELP = "Help",

    /** La risposta contiene i parametri */
    PARAMS = "Params",

    /** Di default la risposta contiene il risultato */
    RESULT = "Result",

}