/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Log]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240707 Extracted from ApgEdr_Service
 * @version 0.2 APG 20241017 Extends ApgUts_Service
 * ----------------------------------------------------------------------------
 */


import {
    Uts
} from "../deps.ts";
import {
    ApgEdr_IRequest
} from "../interfaces/ApgEdr_IRequest.ts";



/**
 * Service to manage logging of events in an Edr based microservice
 */
export class ApgEdr_Log_Service extends Uts.ApgUts_Service {



    static override InitServiceName() {
        return ApgEdr_Log_Service.name;
    }


    /**
     * Log also the debug events
     */
    static DoDebug = false;

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
        atype: Uts.ApgUts_eEventType,
        aclassName: string,
        // deno-lint-ignore ban-types
        afunction: Function,
        amessage: string
    ) {

        const event = Uts.ApgUts_EventFactory.New(atype, aclassName, afunction, amessage);

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
        aevents: Uts.ApgUts_ILoggableEvent[]
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
        aclassName: string,
        // deno-lint-ignore ban-types
        afunction: Function,
        amessage: string
    ) {
        this.Log(arequest, Uts.ApgUts_eEventType.INFO, aclassName, afunction, amessage);
    }



    static LogError(
        arequest: ApgEdr_IRequest,
        aclassName: string,
        // deno-lint-ignore ban-types
        afunction: Function,
        amessage: string
    ) {
        this.Log(arequest, Uts.ApgUts_eEventType.ERROR, aclassName, afunction, amessage);
    }



    static LogDebug(
        arequest: ApgEdr_IRequest,
        aclassName: string,
        afunction: Function,
        amessage: string
    ) {
        if (this.DoDebug) {
            this.Log(arequest, Uts.ApgUts_eEventType.DEBUG, aclassName, afunction, amessage);
        }
    }



    static #Echo(
        arequest: ApgEdr_IRequest,
        aevent: Uts.ApgUts_ILoggableEvent
    ) {

        const counter = arequest.counter.toString().padStart(6, "0");
        const perf = aevent.time.toFixed(2).padStart(12, "0");

        let message = "";

        message = ` #${counter} | ${aevent.type}  | ${aevent.message}`;

        message = this.#colorizeEcho(aevent, message);
        console.log(message);

        if (this.DoVerboseEcho) {
            message = `                  | ${perf} | ${aevent.module}.${aevent.function.name}`;
            console.log(message);
            console.log("");
        }

    }



    static #colorizeEcho(
        aevent: Uts.ApgUts_ILoggableEvent,
        message: string
    ) {
        
        switch (aevent.type) {

            case Uts.ApgUts_eEventType.ERROR: {
                message = Uts.Std.Colors.red(message);
                break;
            }

            case Uts.ApgUts_eEventType.INFO: {
                break;
            }

            case Uts.ApgUts_eEventType.DEBUG: {
                message = Uts.Std.Colors.magenta(message);
                break;
            }

            case Uts.ApgUts_eEventType.PERF: {
                message = Uts.Std.Colors.gray(message);
                break;
            }

            case Uts.ApgUts_eEventType.CALL: {
                message = Uts.Std.Colors.green(message);
                break;
            }

            case Uts.ApgUts_eEventType.ANSW: {
                message = Uts.Std.Colors.cyan(message);
                break;
            }

            case Uts.ApgUts_eEventType.AUTH: {
                message = Uts.Std.Colors.yellow(message);
                break;
            }

            case Uts.ApgUts_eEventType.REDIR: {
                message = Uts.Std.Colors.blue(message);
                break;
            }
                
            case Uts.ApgUts_eEventType.TELE: {
                message = Uts.Std.Colors.bgBlue(message);
                break;
            }

            default: {
                break;
            }

        }
        return message;
    }






}