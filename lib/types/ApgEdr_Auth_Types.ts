/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2024/07/02]
 * @version 0.9.2 [APG 2024/07/26] English comments
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import {ApgEdr_Auth_eRole} from "../enums/ApgEdr_Auth_eRole.ts";
import {ApgEdr_Auth_IProfile} from "../interfaces/ApgEdr_Auth_IProfile.ts";
import {ApgEdr_Auth_IUser} from "../interfaces/ApgEdr_Auth_IUser.ts";


/**
 * User email
 */
export type ApgEdr_Auth_TUserEmail = string;


/**
 * Recordset of users authorization data
 */
export type ApgEdr_Auth_TAuthorization = Record<ApgEdr_Auth_TUserEmail, ApgEdr_Auth_eRole>;


/**
 * Recorset of users authentication data
 */
export type ApgEdr_Auth_TAuthentication = Record<ApgEdr_Auth_TUserEmail, ApgEdr_Auth_IUser>;


/**
 * Recordset of users profiles data
 */
export type ApgEdr_Auth_TProfilation = Record<ApgEdr_Auth_TUserEmail, ApgEdr_Auth_IProfile>;

