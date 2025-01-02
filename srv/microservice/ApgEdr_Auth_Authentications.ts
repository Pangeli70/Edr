/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/08/13] Cleanup
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Edr } from "../deps.ts";


// TODO these ones should come from the database --APG 20241224

export const ApgEdr_Auth_Authentications: Edr.ApgEdr_Auth_TAuthentication = {

    'pangeli70@gmail.com': {
        email: 'pangeli70@gmail.com',
        lastOtp: 0,
        lastOtpDateTime: 0,
        otpAttempts: 0,
        isLocked: false,
        authentications: 0
    },

    'paolo.angeli@bredasys.com': {
        email: 'paolo.angeli@bredasys.com',
        lastOtp: 0,
        lastOtpDateTime: 0,
        otpAttempts: 0,
        isLocked: false,
        authentications: 0
    },

    'luca.comelli@bredasys.com': {
        email: 'luca.comelli@bredasys.com',
        lastOtp: 0,
        lastOtpDateTime: 0,
        otpAttempts: 0,
        isLocked: false,
        authentications: 0
    }

};