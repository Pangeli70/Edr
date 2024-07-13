/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240704
 * ----------------------------------------------------------------------------
 */

import { Djwt } from "../deps.ts";
import { BrdEdr_Auth_eRole } from "../enums/BrdEdr_Auth_eRole.ts";


/**
 * Definizione delle informazioni trasportate dal JWT
 */
export interface BrdEdr_Auth_IJwtPayload extends Djwt.Payload {

    /** 
     * Identificatore dell'utente deve essere una email valida per permettere
     * l'invio delle OTP
    */
    email: string;

    /** Ruolo dell'utente per l'interazione con il microservizio */
    role: BrdEdr_Auth_eRole;
}



