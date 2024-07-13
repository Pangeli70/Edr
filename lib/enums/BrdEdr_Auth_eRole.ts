/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240702
 * ----------------------------------------------------------------------------
 */


/**
 * Ruoli per le autorizzazioni delle richieste di utilizzo del server Edr
 */
export enum BrdEdr_Auth_eRole {

    /** Amministratore */
    ADMIN = "Admin",

    /** Utente */
    USER = "User",

    /** Ospite */
    GUEST = "Guest",

}