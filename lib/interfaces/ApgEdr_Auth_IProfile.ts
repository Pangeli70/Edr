/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240702
 * @version 0.2 APG 20240726 English comments
 * ----------------------------------------------------------------------------
 */


/**
 * User's profilation data
 */
export interface ApgEdr_Auth_IProfile {

    /**
     * User's identifier must be a valid email
     */
    email: string;

    /**
     * Name
     */
    name: string;

    /**
     * Surname
     */
    surname: string;

    /**
     * Company identifier
     */
    companyId: string;

    /**
     * Company name
     */
    companyName: string;

    /**
     * Role in the company
     */
    companyRole: string;

    /**
     * Description
     */
    description: string[];
}



