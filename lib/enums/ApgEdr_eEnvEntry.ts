/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2024/07/13]
 * @version 0.9.2 [APG 2024/07/26] English comments
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


/**
 * Environment variables names used by Edr based microservices
 */
export enum ApgEdr_eEnvEntry {

    /**
     * Token for Resend (resend.com) Email Web Api Service
     */
    EMAIL_API = "APG_EDR_MAIL_RESEND_KEY",

    /**
     * Json Web Token crypto Key (user defined)
     */
    JWT_CRYPTO = "APG_EDR_AUTH_CRYPTO_KEY",

    /**
     * Github private packages auth key
     */
    GITHUB_PK = "APG_EDR_GITHUB_PRIVATE_KEY",

    /**
     * Mongo DB atlas host
     */
    ATLAS_HOST = "APG_MNG_ATLAS_HOST",

    /**
     * Mongo DB atlas user
     */
    ATLAS_USER = "APG_MNG_ATLAS_USER",

    /**
     * Mongo DB atlas password
     */
    ATLAS_PWD = "APG_MNG_ATLAS_PWD"
}