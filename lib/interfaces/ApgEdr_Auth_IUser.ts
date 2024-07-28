/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240704
 * @version 0.2 APG 20240726 English comments
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
     * User description
     */
    description: string[];
}




