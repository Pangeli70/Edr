/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Auth]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240701
 * ----------------------------------------------------------------------------
 */

import {
    Djwt,
    Uts
} from "../deps.ts";
import {
    ApgEdr_Auth_eCookie
} from "../enums/ApgEdr_Auth_eCookie.ts";
import {
    ApgEdr_Auth_eRole
} from "../enums/ApgEdr_Auth_eRole.ts";
import {
    ApgEdr_Env_eEntry
} from "../enums/ApgEdr_Env_eEntry.ts";
import {
    ApgEdr_Auth_IJwtPayload
} from "../interfaces/ApgEdr_Auth_IJwtPayload.ts";
import {
    ApgEdr_Auth_IUser
} from "../interfaces/ApgEdr_Auth_IUser.ts";
import {
    ApgEdr_Auth_TAuthentication,
    ApgEdr_Auth_TAuthorization,
    ApgEdr_Auth_TProfilation
} from "../types/ApgEdr_Auth_Types.ts";





export class ApgEdr_Auth_Service {

    static readonly ISSUER = 'ApgEdr_Auth_Service';

    static readonly MAX_OTP_ATTEMPTS = 10;
    static readonly MAX_OTP_TIME_SPAN = 10 * 60 * 1000;  // 10 minutes in milliseconds

    static readonly MAX_JWT_TIME_SPAN = 5 * 60 * 60;  // 5 hours in seconds
    static readonly MAX_COOKIE_AGE = 5 * 60 * 60;  // 5 hours in seconds

    static readonly CRYPTO_ALGORITHM = 'HS256';

    static readonly JWT_PAYLOAD_SIGNATURE = "JWT_Payload";


    static currentKey: CryptoKey | null = null;


    static Authentications: ApgEdr_Auth_TAuthentication = {
        'pangeli70@gmail.com': {
            email: 'pangeli70@gmail.com',
            lastOtp: 0,
            lastOtpDateTime: 0,
            otpAttempts: 0,
            isLocked: false,
            description: []
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
            companyName: 'Breda Sistemi Industriali S.p.A.',
            description: ['Disegnatore, progettista, sviluppatore'],
            companyRole: 'Tecnico di supporto'
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

        const r = new Uts.ApgUts_RestResult('ApgEdr');

        const user = ApgEdr_Auth_Service.Authentications[aemail];

        if (!user) {
            r.ok = false;
            r.message = 'User not found';
            return r;
        }

        if (user.isLocked) {
            r.ok = false;
            r.message += 'User is locked';
            return r;
        }


        if (user.lastOtp !== aotp) {
            r.ok = false;
            r.message = 'Wrong OTP';
            user.otpAttempts++;

            if (user.otpAttempts >= this.MAX_OTP_ATTEMPTS) {
                user.isLocked = true;
                user.lockedReason = ': Maximum OPT attempts reached the user is locked';
                r.message += user.lockedReason;
            }

            return r;
        }

        const deltaTimeMilliseconds = aotpDateTime - user.lastOtpDateTime;

        if (deltaTimeMilliseconds > this.MAX_OTP_TIME_SPAN) {
            r.ok = false;
            r.message = 'OTP expired';
            user.otpAttempts = 0;

            return r;
        }

        return r;
    }



    static NewOtp(
        aemail: string,
        aotp: number,
        aotpDateTime: number
    ) {

        const r = new Uts.ApgUts_RestResult('ApgEdr');

        const user = ApgEdr_Auth_Service.Authentications[aemail];
        if (!user) {
            r.ok = false;
            r.message = 'User not found';
            return r;
        }

        user.lastOtp = aotp;
        user.lastOtpDateTime = aotpDateTime;

        return r;
    }



    static async GetJwtCookie(
        aemail: string,
        asession: string
    ) {
        const r = new Uts.ApgUts_RestResult('ApgEdr');

        const user = ApgEdr_Auth_Service.Authentications[aemail];
        if (!user) {
            r.ok = false;
            r.message = 'User not found';
            return r;
        }

        const role = this.GetRoleForUser(user);
        if (!role) {
            r.ok = false;
            r.message = 'Role not found for user ' + aemail;
            return r;
        }

        const jwt = await this.GenerateJwt(user.email, role, asession);

        const cookie: Uts.Std.Cookie = {
            name: ApgEdr_Auth_eCookie.JWT,
            value: jwt,
            path: '/',
            maxAge: this.MAX_COOKIE_AGE,
            httpOnly: true
        };
        r.payload = {
            signature: "Cookie",
            data: cookie
        }

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
        asession: string
    ) {

        const header: Djwt.Header = {
            alg: "HS256",
            typ: "JWT",
        };

        const payload: ApgEdr_Auth_IJwtPayload = {
            iss: this.ISSUER,
            exp: Djwt.getNumericDate(this.MAX_JWT_TIME_SPAN),
            email: aemail,
            role: arole,
            session: asession
        };


        await this.#ensureCurrentCryptoKey();

        const jwt = await Djwt.create(header, payload, this.currentKey)

        return jwt;

    };



    static async #ensureCurrentCryptoKey() {

        const CRYPTO_KEY = Deno.env.get(ApgEdr_Env_eEntry.JWT_CRYPTO);

        if (CRYPTO_KEY == undefined) {
            throw new Error("No CRYPTO_KEY provided in environment");
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
        const r = new Uts.ApgUts_RestResult('ApgEdr');
        try {

            await this.#ensureCurrentCryptoKey();
            const payload = await Djwt.verify(jwt, this.currentKey);

            r.ok = true;
            r.message = 'JWT is valid';

            r.payload = {
                signature: this.JWT_PAYLOAD_SIGNATURE,
                data: payload
            }

        }
        catch (_e) {
            r.ok = false;
            r.message = 'Invalid JWT: ' + _e.message;
        }

        return r;
    }



    static GetRoleForUser(user: ApgEdr_Auth_IUser) {
        return this.Authorizations[user.email];
    }



    // deno-lint-ignore no-explicit-any
    static IsJwtPayload(apayload: any): apayload is ApgEdr_Auth_IJwtPayload {
        return (
            apayload &&
            apayload.signature &&
            apayload.signature == ApgEdr_Auth_Service.JWT_PAYLOAD_SIGNATURE
        );
    }


}

