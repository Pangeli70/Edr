/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241108 Extracted from ApgEdr_Service
 * ----------------------------------------------------------------------------
 */


import { Uts } from "../deps.ts";
import { ApgEdr_IRequest } from "../interfaces/ApgEdr_IRequest.ts";


/**
 * Service for logging requests on the Edr Microservice
 */
export class ApgEdr_Service_Requests
    
    extends Uts.ApgUts_Service {

    
    protected static InitServiceName() {
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

    }



    static RetriveEdrByCallId(acallId: number) {

        return this.Requests.find(aitem => aitem.counter == acallId);

    }




}