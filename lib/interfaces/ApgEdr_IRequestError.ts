/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2024/07/04]
 * @version 0.9.2 [APG 2024/07/26] English comments
 * @version 0.9.3 [APG 2024/08/13] Redirect url
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


/**
 * Data for managing and displaying errors occured during request processing
 */
export interface ApgEdr_IRequestError {

    /** Identification number of the request since last service restart */
    counter: number;

    /** Error message */
    message: string;

    /** Redirect url after displaying the error */
    redirectUrl: string; // @ 0.3
}



