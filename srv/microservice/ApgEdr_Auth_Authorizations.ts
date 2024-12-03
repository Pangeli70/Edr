/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240813 Cleanup
 * ----------------------------------------------------------------------------
 */

import {Edr} from "../deps.ts";

export const ApgEdr_Auth_Authorizations: Edr.ApgEdr_Auth_TAuthorization = {

    'pangeli70@gmail.com': Edr.ApgEdr_Auth_eRole.ADMIN,
    'paolo.angeli@bredasys.com': Edr.ApgEdr_Auth_eRole.USER,
    'luca.comelli@bredasys.com': Edr.ApgEdr_Auth_eRole.USER,

}