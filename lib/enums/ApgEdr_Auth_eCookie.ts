/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240702
 * @version 0.2 APG 20240726 English comments
 * ----------------------------------------------------------------------------
 */


/**
 * Cookie identifiers used by an Edr based authentication microservice
 */
export enum ApgEdr_Auth_eCookie {

    /**
     * User identifier for interactions with protected resources
     */
    USER = "APG_EDR_AUTH_COOKIE_USER",

    /**
     * Json Web Token
     */
    JWT = "APG_EDR_AUTH_COOKIE_JWT",


}