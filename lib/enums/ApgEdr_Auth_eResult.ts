/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Auth]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2024/09/01]
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


/**
 * Authorization verification result
 */
export enum ApgEdr_Auth_eResult {

    /** User role matches with resource role */
    OK = "Ok",

    /** Insufficient privileges */
    INSUFF = "Insuffcient",

    /** Authetication credentials not provided */
    UNKNOWN = "Unknown",

}