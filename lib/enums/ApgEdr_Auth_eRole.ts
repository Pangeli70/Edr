/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240702
 * @version 0.2 APG 20240726 English comments
 * ----------------------------------------------------------------------------
 */


/**
 * Authorization roles for the users registered for the interaction with an Edr based microservice
 */
export enum ApgEdr_Auth_eRole {

    /** Adrministrator */
    ADMIN = "Admin",

    /** Registerd user */
    USER = "User",

    /** Unknown guest */
    GUEST = "Guest",

}