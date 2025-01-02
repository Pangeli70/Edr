/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/08/13] Cleanup
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Edr } from "../deps.ts";

// TODO these ones should come from the database --APG 20241224

export const ApgEdr_Auth_Authorizations: Edr.ApgEdr_Auth_TAuthorization = {

    'pangeli70@gmail.com': Edr.ApgEdr_Auth_eRole.ADMIN,
    'paolo.angeli@bredasys.com': Edr.ApgEdr_Auth_eRole.USER,
    'luca.comelli@bredasys.com': Edr.ApgEdr_Auth_eRole.USER,

}