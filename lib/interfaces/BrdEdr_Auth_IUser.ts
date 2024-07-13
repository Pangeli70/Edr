/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240704
 * ----------------------------------------------------------------------------
 */


/**
 * Definizione dell'utente che utilizza il microservizio
 */
export interface BrdEdr_Auth_IUser {

    /** Identificatore dell'utente deve essere una email valida */
    email: string;

    /** Ultima password generata */
    lastOtp: number;

    /** Data ora in millisecondi dell' ultima password generata */
    lastOtpDateTime: number;

    /** Tentativi falliti di autenticazione */
    otpAttempts: number;

    /** L'utente è bloccato */
    isLocked: boolean;

    /** Descrizione dell'utente */
    description: string[];
}



