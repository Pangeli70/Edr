/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 202401056
 * @version 0.2 APG 20240726 English comments
 * ----------------------------------------------------------------------------
 */


/**
 * Modes for interaction with REST API using Get method.
 * Autodiscovery pattern.
 */
export enum ApgEdr_RestRoute_eGetMode {

    /** The response contains a brief help for the API usage */
    HELP = "Help",

    /** The response contains the list of the expected parameters to the API call */
    PARAMS = "Params",

    /** By default the response contains the result of the API call */
    RESULT = "Result",

}