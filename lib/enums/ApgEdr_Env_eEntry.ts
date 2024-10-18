/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240713
 * @version 0.2 APG 20240726 English comments
 * ----------------------------------------------------------------------------
 */


/**
 * Environment variables names used by Edr based microservices
 */
export enum ApgEdr_Env_eEntry {

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