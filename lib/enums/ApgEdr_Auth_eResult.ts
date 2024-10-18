/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240901
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