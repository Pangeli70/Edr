/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Auth]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2024/07/02]
 * @version 0.9.2 [APG 2024/07/26] English comments
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
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



