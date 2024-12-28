/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.0.1 [APG 2024/07/28]
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


/**
 * Cookie identifiers used by an Edr based microservice
 */
export enum ApgEdr_eCookieId {

    /**
     * Preferred language
     */
    LANGUAGE = "APG_EDR_COOKIE_LANGUAGE",

    /**
     * Session identifier for aggregation of telemetry data
     */
    TELEMETRY_ID = "APG_EDR_COOKIE_TELEMETRY_ID",



}