/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Auth]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2024/07/04]
 * @version 0.9.2 [APG 2024/07/26] English comments
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


/**
 * Definition of the user who uses the microservice
 */
export interface ApgEdr_Auth_IUser {

    /**
     * User identifier must be a valid email
     */
    email: string;

    /**
     * Last generated One Time Password
     */
    lastOtp: number;

    /**
     * Milliseconds timestamp of the last generated password, elapsed from last server restart
     */
    lastOtpDateTime: number;

    /**
     * Failed authentication attempts
     */
    otpAttempts: number;

    /**
     * The user is locked
     */
    isLocked: boolean;

    /**
     * The reason why the user is locked
     */
    lockedReason?: string;

    /**
     * The number of times the user has completed the login through the authentication process
     */
    authentications: number;

    /**
     * The date when the user last logged in
     */
    lastLogin?: string;

}




