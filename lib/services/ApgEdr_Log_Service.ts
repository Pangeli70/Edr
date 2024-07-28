/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Log]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240707 Extracted from ApgEdr_Service
 * ----------------------------------------------------------------------------
 */


import {
    Uts
} from "../deps.ts";
import {
    ApgEdr_IRequest
} from "../interfaces/ApgEdr_IRequest.ts";



/**
 * Service to manage logging of events and telemetry in an Edr based microservice
 */
export class ApgEdr_Log_Service {


    /**
     * Log also the debug events
     */
    static IsDebug = false;

    /**
     * Console log of events
     */
    static DoEventsEcho = true;

    /**
     * Console log additional info
     */
    static DoVerboseEcho = true;


    /**
     * Logs an event in the passed Edr request
     */
    static Log(
        aedr: ApgEdr_IRequest,
        atype: Uts.ApgUts_eLogType,
        aimportMetaUrl: string,
        afunction: Function,
        amessage: string
    ) {

        const event = Uts.ApgUts_LogService.Log(atype, aimportMetaUrl, afunction, amessage);

        aedr.events.push(event);

        if (this.DoEventsEcho) {
            ApgEdr_Log_Service.#Echo(aedr, event);
        }

    }


    /**
     * Stores a set of events in the passed request
     */
    static LogEvents(
        arequest: ApgEdr_IRequest,
        aevents: Uts.ApgUts_ILogEvent[]
    ) {

        for (const event of aevents) {

            arequest.events.push(event);

            if (this.DoEventsEcho) {
                ApgEdr_Log_Service.#Echo(arequest, event);
            }
        }

    }



    static LogInfo(
        arequest: ApgEdr_IRequest,
        aimportMetaUrl: string,
        afunction: Function,
        amessage: string
    ) {
        this.Log(arequest, Uts.ApgUts_eLogType.INFO, aimportMetaUrl, afunction, amessage);
    }



    static LogError(
        arequest: ApgEdr_IRequest,
        aimportMetaUrl: string,
        afunction: Function,
        amessage: string
    ) {
        this.Log(arequest, Uts.ApgUts_eLogType.ERROR, aimportMetaUrl, afunction, amessage);
    }



    static LogDebug(
        arequest: ApgEdr_IRequest,
        aimportMetaUrl: string,
        afunction: Function,
        amessage: string
    ) {
        if (this.IsDebug) {
            this.Log(arequest, Uts.ApgUts_eLogType.DEBUG, aimportMetaUrl, afunction, amessage);
        }
    }




    static #Echo(
        arequest: ApgEdr_IRequest,
        aevent: Uts.ApgUts_ILogEvent
    ) {

        const counter = arequest.counter.toString().padStart(6, "0");
        const perf = aevent.time.toFixed(2).padStart(12, "0");

        let message = "";

        message = ` #${counter} | ${aevent.type}  | ${aevent.message}`;
        console.log(message);

        if (this.DoVerboseEcho) {
            message = `                  | ${perf} | ${aevent.module}.${aevent.function.name}`;
            console.log(message);
        }

        console.log("");
    }


}