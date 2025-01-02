/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Auth]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2024/07/01]
 * @version 0.9.2 [APG 2024/10/17] Extends ApgUts_Service
 * @version 0.9.3 [APG 2024/11/07] Better errorm management
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Djwt, Uts } from "../deps.ts";
import { ApgEdr_Auth_eCookie } from "../enums/ApgEdr_Auth_eCookie.ts";
import { ApgEdr_Auth_eRole } from "../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_eEnvEntry } from "../enums/ApgEdr_eEnvEntry.ts";
import { ApgEdr_Auth_IJwtPayload } from "../interfaces/ApgEdr_Auth_IJwtPayload.ts";
import { ApgEdr_Auth_IUser } from "../interfaces/ApgEdr_Auth_IUser.ts";
import {
    ApgEdr_Auth_TAuthentication,
    ApgEdr_Auth_TAuthorization,
    ApgEdr_Auth_TProfilation
} from "../types/ApgEdr_Auth_Types.ts";



enum _eTranslation {
    ERROR_User_not_found = "ERROR_User_not_found",
    ERROR_User_is_locked = "ERROR_User_is_locked",
    ERROR_Wrong_Otp = "ERROR_Wrong_Otp",
    ERROR_Max_attempts = "ERROR_Max_attempts",
    ERROR_Otp_Expired = "ERROR_Otp_Expired",

}



const _Translator = new Uts.ApgUts_Translator(
    {
        [_eTranslation.ERROR_User_not_found]: {
            EN: "User not found",
            IT: "Utente non trovato",
        },
        [_eTranslation.ERROR_User_is_locked]: {
            EN: "User is locked",
            IT: "Utente bloccato",
        },
        [_eTranslation.ERROR_Wrong_Otp]: {
            EN: "Wrong OTP. You have still [[%1]] attempts",
            IT: "OTP errata. Hai ancora [[%1]] tentativi",
        },
        [_eTranslation.ERROR_Max_attempts]: {
            EN: "Wrong OTP. Maximum number of attempts reached, the user is locked",
            IT: "OTP errata. Numero massimo di tentativi raggiunto, l'utente viene bloccato",
        },
        [_eTranslation.ERROR_Otp_Expired]: {
            EN: "OTP has expired. Request a new one.",
            IT: "La OTP è scaduta. Richiederne una nuova.",
        },

    }
)



/**
 * Authentication and Authorization service
 */
export class ApgEdr_Service_Auth
    
    extends Uts.ApgUts_Service {
    

    protected _events: Uts.ApgUts_ILoggableEvent[] = [];

    protected static InitServiceName() {
        return ApgEdr_Service_Auth.name;
    }

    static readonly MAX_OTP_ATTEMPTS = 5;
    static readonly OTP_VALIDITY_MINUTES = 10;
    static readonly MAX_OTP_TIME_SPAN_MS = this.OTP_VALIDITY_MINUTES * 60 * 1000;  // in milliseconds

    static readonly MAX_JWT_TIME_SPAN = 5 * 60 * 60;  // 5 hours in seconds
    static readonly MAX_COOKIE_AGE = 5 * 60 * 60;  // 5 hours in seconds

    static readonly CRYPTO_ALGORITHM = 'HS256';

    static readonly JWT_PAYLOAD_SIGNATURE = "JWT_Payload";


    static currentKey: CryptoKey | null = null;

    // TODO: move to Atlas DB for persistent storage -- [APG 2024/10/17] @5h
    static Authentications: ApgEdr_Auth_TAuthentication = {
        'pangeli70@gmail.com': {
            email: 'pangeli70@gmail.com',
            lastOtp: 0,
            lastOtpDateTime: 0,
            otpAttempts: 0,
            isLocked: false,
            authentications: 0
        }
    };

    static Authorizations: ApgEdr_Auth_TAuthorization = {

        'pangeli70@gmail.com': ApgEdr_Auth_eRole.ADMIN
    }

    static Profilations: ApgEdr_Auth_TProfilation = {

        'pangeli70@gmail.com': {
            email: 'pangeli70@gmail.com',
            name: 'Paolo Giusto',
            surname: 'ANGELI',
            companyId: '1234',
            companyName: 'Apg Solutions Srl',
            description: ['Sviluppatore'],
            companyRole: 'Titolare'
        }
    }


    static GenerateOTP() {
        return Math.floor(100000 + Math.random() * 900000);
    }


    static VerifyOtp(
        aemail: string,
        aotp: number,
        aotpDateTime: number,
        alang: Uts.ApgUts_TLanguage
    ) {
        const METHOD = this.Method(this.VerifyOtp);
        const r = new Uts.ApgUts_Result();

        const user = ApgEdr_Service_Auth.Authentications[aemail];

        if (!user) {
            return this.Error(r, METHOD, _Translator.get(_eTranslation.ERROR_User_not_found, alang));
        }

        if (user.isLocked) {
            return this.Error(r, METHOD, _Translator.get(_eTranslation.ERROR_User_is_locked, alang));
        }


        if (user.lastOtp !== aotp) {

            user.otpAttempts++;
            const remainingAttempts = (this.MAX_OTP_ATTEMPTS - user.otpAttempts).toString();
            let message = _Translator.get(_eTranslation.ERROR_Wrong_Otp, alang, [remainingAttempts])

            if (user.otpAttempts >= this.MAX_OTP_ATTEMPTS) {
                user.isLocked = true;
                message = _Translator.get(_eTranslation.ERROR_Max_attempts, alang);
                user.lockedReason = message;
            }

            return this.Error(r, METHOD, message);
        }

        const deltaTimeMilliseconds = aotpDateTime - user.lastOtpDateTime;

        if (deltaTimeMilliseconds > this.MAX_OTP_TIME_SPAN_MS) {
            user.otpAttempts = 0;
            return this.Error(r, METHOD, _Translator.get(_eTranslation.ERROR_Otp_Expired, alang));
        }

        user.authentications++;
        user.lastLogin = new Date().toISOString();
        user.otpAttempts = 0;

        this.LogInfo(this.VerifyOtp.name, `Called for user [${aemail}]`);

        return r;
    }



    static SetNewOtpForUser(
        aemail: string,
        aotp: number,
        aotpDateTime: number,
        alang: Uts.ApgUts_TLanguage
    ) {
        const METHOD = this.Method(this.SetNewOtpForUser);
        const r = new Uts.ApgUts_Result();

        const user = ApgEdr_Service_Auth.Authentications[aemail];
        if (!user) {
            return this.Error(r, METHOD, _Translator.get(_eTranslation.ERROR_User_not_found, alang));
        }

        user.lastOtp = aotp;
        user.lastOtpDateTime = aotpDateTime;

        return r;
    }



    static async GetJwtCookie(
        aemail: string,
    ) {
        const r = new Uts.ApgUts_Result<Uts.Std.Cookie>();

        let role = ApgEdr_Auth_eRole.GUEST;
        let email = aemail;

        const user = ApgEdr_Service_Auth.Authentications[aemail];
        if (user) {
            role = this.GetRoleForUser(user);
            email = user.email;
        }

        const jwt = await this.GenerateJwt(email, role);

        const cookie: Uts.Std.Cookie = {
            name: ApgEdr_Auth_eCookie.JWT,
            value: jwt,
            path: '/',
            maxAge: this.MAX_COOKIE_AGE,
            httpOnly: true
        };
        r.setPayload(cookie)

        return r;
    }



    static DeleteJwtCookie() {

        const r: Uts.Std.Cookie = {
            name: ApgEdr_Auth_eCookie.JWT,
            value: 'jwt_deleted',
            path: '/',
            maxAge: 0,
            httpOnly: true
        };

        return r;
    }



    static async GenerateJwt(
        aemail: string,
        arole: ApgEdr_Auth_eRole,
    ) {

        const header: Djwt.Header = {
            alg: "HS256",
            typ: "JWT",
        };

        const payload: ApgEdr_Auth_IJwtPayload = {
            iss: this.name,
            exp: Djwt.getNumericDate(this.MAX_JWT_TIME_SPAN),
            email: aemail,
            role: arole,
        };


        await this.#ensureCurrentCryptoKeyOrThrow();

        const jwt = await Djwt.create(header, payload, this.currentKey);

        this.LogInfo(this.GenerateJwt.name, `Called for user [${aemail}]`);

        return jwt;

    };



    static async #ensureCurrentCryptoKeyOrThrow() {

        const CRYPTO_KEY = Deno.env.get(ApgEdr_eEnvEntry.JWT_CRYPTO);

        if (CRYPTO_KEY == undefined) {
            throw new Error("No CRYPTO_KEY provided in environment variables");
        }

        if (this.currentKey == null) {

            const encoder = new TextEncoder();
            const keyBuf = encoder.encode(CRYPTO_KEY);

            this.currentKey = await crypto.subtle.importKey(
                "raw",
                keyBuf,
                { name: "HMAC", hash: "SHA-256" },
                true,
                ["sign", "verify"]
            );
        }
    }



    static async VerifyJwt(
        jwt: string,
    ) {
        const METHOD = this.Method(this.VerifyJwt);
        const r = new Uts.ApgUts_Result();
        try {

            await this.#ensureCurrentCryptoKeyOrThrow();
            const payload = await Djwt.verify(jwt, this.currentKey);
            r.setPayload(payload);

        }
        catch (_e) {

            return this.Error(r, METHOD, 'Contact support, invalid JWT: ' + _e.message);

        }

        return r;
    }



    static GetRoleForUser(user: ApgEdr_Auth_IUser) {
        return this.Authorizations[user.email] || ApgEdr_Auth_eRole.GUEST;
    }



    /**
     * Type guard
     * @param apayload  
    */
    // deno-lint-ignore no-explicit-any
    static IsJwtPayload(apayload: any): apayload is ApgEdr_Auth_IJwtPayload {
        return (
            apayload &&
            apayload.signature &&
            apayload.signature == ApgEdr_Service_Auth.JWT_PAYLOAD_SIGNATURE
        );
    }



    /**
     * Unlocks a user resetting the attempts and the lock flag
     * @param aemail User identifier
     * @remarks The passed email must be checked previously.
     */
    static UnlockUser(
        aemail: string
    ) {

        const user = ApgEdr_Service_Auth.Authentications[aemail];
        if (!user) {
            return;
        }

        user.isLocked = false;
        user.otpAttempts = 0;
        user.lockedReason = '';

        // TODO: Update the user in the database -- [@APG 2024/10/17] @5h

    }

}