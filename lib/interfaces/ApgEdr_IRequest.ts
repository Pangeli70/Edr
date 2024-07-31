/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240704
 * @version 0.2 APG 20240726 English comments + language
 * ----------------------------------------------------------------------------
 */

import {
    Uts
} from "../deps.ts";
import {
    ApgEdr_Auth_IJwtPayload
} from "../mod.ts";



/** 
 * Data to be injected by middleware in the request received by the Drash server
 */
export interface ApgEdr_IRequest {

    /** 
     * Progressive counter identification of the received request
     */
    counter: number;

    /**
     * Milliseconds elapsed from last server restart
     */
    startTime: number;

    /**
     * Date and time when the request was received
     */
    received: string;

    /**
     * Requested url/uri
     */
    route: string;

    /** 
     * Request mode/method/verb
     */
    method: string;

    /**
     * Client IP address
     */
    remoteAddr: Deno.NetAddr;

    /**
     * Memory usage at request receive
     */
    startMemory: number;

    /**
     * Events that occurred during request processing
     */
    events: Uts.ApgUts_ILogEvent[];

    /**
     * The user is authenticated
     */
    auth?: ApgEdr_Auth_IJwtPayload

    /**
     * Total milliseconds elapsed for proicessing the request
     */
    totalTime: number;

    /**
     * Memory usage after processing the request and before sending the response
     */
    endMemory: number;

    /**
     * Language used by the user for the current request
     */
    language: Uts.ApgUts_TLanguage; // @0.2
}




