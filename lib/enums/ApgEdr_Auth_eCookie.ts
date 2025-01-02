/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Auth]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2024/07/02]
 * @version 0.9.2 [APG 2024/07/26] English comments
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
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