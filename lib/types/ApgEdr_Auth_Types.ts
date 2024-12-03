/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240702
 * @version 0.2 APG 20240726 English comments
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

