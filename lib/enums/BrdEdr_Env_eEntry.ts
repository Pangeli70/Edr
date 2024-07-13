/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240713
 * ----------------------------------------------------------------------------
 */


/**
 * Identificatori delle variabili di abiente utilizzate dal server Edr
 */
export enum BrdEdr_Env_eEntry {

    /** Token for Resend Email Web Api Service */
    EMAIL_API = "BRD_EDR_MAIL_RESEND_KEY",

    /** Json Web Token crypto Key*/
    JWT_CRYPTO = "BRD_EDR_AUTH_CRYPTO_KEY",

    /** Github private packages key*/
    GITHUB_PKG = "BRD_EDR_GITHUB_PAKAGES_KEY"
}