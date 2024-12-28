/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2024/07/04]
 * @version 0.9.2 [APG 2024/07/26] English comments + language
 * @version 0.9.3 [APG 2024/10/05] Messages + Telemetry session
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Uts } from "../deps.ts";
import { ApgEdr_Auth_IJwtPayload } from "../mod.ts";
import { ApgEdr_IMessage } from "./ApgEdr_IMessage.ts";



/** 
 * Data to be injected by middleware in the request received by the Drash server
 */
export interface ApgEdr_IRequest {

    /**
     * LocalHost | DENO_DEPLOYMENT_ID env variable.
     */
    deployment: string; // @03

    /** 
     * Progressive counter identification of the received request of the current
     * microservice after last restart.
     */
    counter: number;

    /**
     * Telemetry id for aggregations of logged events
     * 
     * UTC timestamp
     */
    telemetryId: string; // @03

    /**
     * UTC Timestamp when the request was received
     */
    received: string;

    /**
     * Client IP address
     */
    client: Deno.NetAddr;

    /** 
     * Request mode/method/verb
     */
    method: string;

    /**
     * Requested url/uri
     */
    route: string;

    /**
     * Language used by the user for the current request, comes from the cookie 
     * or from the browser's language
     */
    language: Uts.ApgUts_TLanguage; // @0.2


    /**
     * Milliseconds elapsed from last microservice restart
     */
    startTime: number;

    /**
     * Total milliseconds elapsed for processing the request before sending the response
     */
    totalTime: number;

    /**
     * Memory usage when the microservice started to process the request
     */
    startMemory: number;

    /**
     * Memory usage after processing the request and before sending the response
     */
    endMemory: number;

    /**
     * Events that occurred during processing
     */
    events: Uts.ApgUts_ILoggableEvent[];

    /**
     * The user is authenticated
     */
    auth?: ApgEdr_Auth_IJwtPayload


    /**
     * Redirected from a chain of other redirects maybe
     */
    redirectedFrom?: string[];

    /**
     * Message injected in the request during the processing that can be 
     * displayed to the user. Usually is the error message
     */
    message?: ApgEdr_IMessage; // @0.3
}




