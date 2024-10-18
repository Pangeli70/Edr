/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240704
 * @version 0.2 APG 20240726 English comments
 * ----------------------------------------------------------------------------
 */

import {
    Djwt
} from "../deps.ts";
import {
    ApgEdr_Auth_eRole
} from "../enums/ApgEdr_Auth_eRole.ts";


/**
 * Data contained in the JWT payload
 */
export interface ApgEdr_Auth_IJwtPayload extends Djwt.Payload {

    /** 
     * User's identifier must be a valid email to allow the microservice
     * to send the OTPs
    */
    email: string;

    /**
     * Authorization role of the user. for the interaction with the microservice. 
     */
    role: ApgEdr_Auth_eRole;

}



