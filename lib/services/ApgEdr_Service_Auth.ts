/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Auth]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240701
 * @version 0.2 APG 20241017 Extends ApgUts_Service
 * @version 0.3 APG 20241107 Better errorm management
 * ----------------------------------------------------------------------------
 */

import { Djwt, Uts } from "../deps.ts";
import { ApgEdr_Auth_eCookie } from "../enums/ApgEdr_Auth_eCookie.ts";
import { ApgEdr_Auth_eRole } from "../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Env_eEntry } from "../enums/ApgEdr_Env_eEntry.ts";
import { ApgEdr_Auth_IJwtPayload } from "../interfaces/ApgEdr_Auth_IJwtPayload.ts";
import { ApgEdr_Auth_IUser } from "../interfaces/ApgEdr_Auth_IUser.ts";
import {
    ApgEdr_Auth_TAuthentication,
    ApgEdr_Auth_TAuthorization,
    ApgEdr_Auth_TProfilation
} from "../types/ApgEdr_Auth_Types.ts";




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

    // TODO: move to Atlas DB for persistent storage (@APG 2024/10/17) @5h
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
            surname: 'Angeli',
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
        aotpDateTime: number
    ) {
        const METHOD = this.Method(this.VerifyOtp);
        const r = new Uts.ApgUts_Result();

        const user = ApgEdr_Service_Auth.Authentications[aemail];

        if (!user) {
            return this.Error(r, METHOD, 'User not found');
        }

        if (user.isLocked) {
            return this.Error(r, METHOD, 'User is locked');
        }


        if (user.lastOtp !== aotp) {

            user.otpAttempts++;
            const remainingAttempts = (this.MAX_OTP_ATTEMPTS - user.otpAttempts).toString();
            let message = 'Wrong OTP. You have still ' + remainingAttempts + ' attempts';

            if (user.otpAttempts >= this.MAX_OTP_ATTEMPTS) {
                user.isLocked = true;
                message = ': Maximum OPT attempts reached the user is locked';
                user.lockedReason = message;
            }

            return this.Error(r, METHOD, message);
        }

        const deltaTimeMilliseconds = aotpDateTime - user.lastOtpDateTime;

        if (deltaTimeMilliseconds > this.MAX_OTP_TIME_SPAN_MS) {
            user.otpAttempts = 0;
            return this.Error(r, METHOD, 'OTP expired');
        }

        user.authentications++;
        user.lastLogin = new Date().toISOString();
        user.otpAttempts = 0;

        return r;
    }



    static SetNewOtpForUser(
        aemail: string,
        aotp: number,
        aotpDateTime: number
    ) {
        const METHOD = this.Method(this.SetNewOtpForUser);
        const r = new Uts.ApgUts_Result();

        const user = ApgEdr_Service_Auth.Authentications[aemail];
        if (!user) {
            return this.Error(r, METHOD, 'User not found');
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

        const jwt = await Djwt.create(header, payload, this.currentKey)

        return jwt;

    };



    static async #ensureCurrentCryptoKeyOrThrow() {

        const CRYPTO_KEY = Deno.env.get(ApgEdr_Env_eEntry.JWT_CRYPTO);

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
        jwt: string
    ) {
        const METHOD = this.Method(this.VerifyJwt);
        const r = new Uts.ApgUts_Result();
        try {

            await this.#ensureCurrentCryptoKeyOrThrow();
            const payload = await Djwt.verify(jwt, this.currentKey);
            r.setPayload(payload);

        }
        catch (_e) {

            return this.Error(r, METHOD, 'Invalid JWT: ' + _e.message);

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

        // TODO: Update the user in the database (@APG 2024/10/17 01:30) @5h

    }

}