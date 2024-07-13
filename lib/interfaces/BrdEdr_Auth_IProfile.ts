/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240702
 * ----------------------------------------------------------------------------
 */


/**
 * Definizione del profilo dell'utente che utilizza il microservizio
 */
export interface BrdEdr_Auth_IProfile {

    /** Identificatore dell'utente deve essere una email valida */
    email: string;

    /** Nome */
    name: string;

    /** Cognome */
    surname: string;

    /** Identificatore dell'azienda */
    companyId: string;

    /** Nome dell'azienda */
    companyName: string;

    /** Descrizione dell'utente */
    description: string[];

    /** Ruolo aziendale dell'utente */
    role: string;
}



