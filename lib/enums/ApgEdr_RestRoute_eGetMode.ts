/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Rest]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2024/01/05]
 * @version 0.9.2 [APG 2024/07/26] English comments
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
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