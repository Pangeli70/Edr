/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240702
 * ----------------------------------------------------------------------------
 */

import {
    BrdEdr_Auth_eRole
} from "../enums/BrdEdr_Auth_eRole.ts";
import {
    BrdEdr_Auth_IProfile
} from "../interfaces/BrdEdr_Auth_IProfile.ts";
import {
    BrdEdr_Auth_IUser
} from "../interfaces/BrdEdr_Auth_IUser.ts";

/**
 * Definizione dell'indirizzo email utilizzato come identificativo dell'utente
 */
export type BrdEdr_Auth_TUserEmail = string;

/**
 * Definizione delle autorizzazioni per gli utenti di un microservizio
 */
export type BrdEdr_Auth_TAuthorization = Record<BrdEdr_Auth_TUserEmail, BrdEdr_Auth_eRole>;

/**
 * Definizione delle autenticazioni per gli utenti di un microservizio
 */
export type BrdEdr_Auth_TAuthentication = Record<BrdEdr_Auth_TUserEmail, BrdEdr_Auth_IUser>;

/**
 * Definizione delle autenticazioni per gli utenti di un microservizio
 */
export type BrdEdr_Auth_TProfilation = Record<BrdEdr_Auth_TUserEmail, BrdEdr_Auth_IProfile>;

