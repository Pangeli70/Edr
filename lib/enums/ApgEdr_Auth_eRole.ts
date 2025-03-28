/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Auth]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2024/07/02]
 * @version 0.9.2 [APG 2024/07/26] English comments
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


/**
 * Authorization roles for the users registered for the interaction with an Edr based microservice
 */
export enum ApgEdr_Auth_eRole {

    /** Developer */
    DEV = "Dev",

    /** Administrator */
    ADMIN = "Admin",

    /** Registered user */
    USER = "User",

    /** Guest */
    GUEST = "Guest",

    /** Unknown anonymous */
    ANONYMOUS = "Anonymous",

}