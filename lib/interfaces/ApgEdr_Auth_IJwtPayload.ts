/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Auth]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2024/07/04]
 * @version 0.9.2 [APG 2024/07/26] English comments
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Djwt } from "../deps.ts";
import { ApgEdr_Auth_eRole } from "../enums/ApgEdr_Auth_eRole.ts";


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



