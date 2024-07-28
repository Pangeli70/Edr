/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240704
 * @version 0.2 APG 20240726 English comments
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
}



