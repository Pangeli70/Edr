/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2024/11/08] Extracted from ApgEdr_Service
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Uts } from "../deps.ts";
import { ApgEdr_IRequest } from "../interfaces/ApgEdr_IRequest.ts";



/**
 * Service for logging requests on the Edr Microservice
 */
export class ApgEdr_Service_Requests
    
    extends Uts.ApgUts_Service {

    
    protected static override InitServiceName() {
        return ApgEdr_Service_Requests.name;
    }

    /** 
     * Cache of the requests processed with errors.
     * It is used to fast track the errors
     */
    static Errors: ApgEdr_IRequest[] = [];

    /** 
     * Cache of the requests made by the clients 
     * It is used for the logging and telemetry
     */
    static Requests: ApgEdr_IRequest[] = [];




    static Store(aedr: ApgEdr_IRequest) {

        this.Requests.push(aedr);
        this.LogInfo(this.Store.name, `Called for callId [${aedr.counter}]`);

    }



    static RetriveEdrByCallId(acallId: number) {

        return this.Requests.find(aitem => aitem.counter == acallId);

    }




}