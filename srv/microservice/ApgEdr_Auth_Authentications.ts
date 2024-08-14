/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240813 Cleanup
 * ----------------------------------------------------------------------------
 */

import {
    Edr
} from "../deps.ts";


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