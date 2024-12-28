/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0.0 [APG 2024/11/07] Concrete implementation of EDR request interface
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Drash, Uts } from "../deps.ts";
import { ApgEdr_Auth_IJwtPayload } from "../interfaces/ApgEdr_Auth_IJwtPayload.ts";
import { ApgEdr_IMessage } from "../interfaces/ApgEdr_IMessage.ts";
import { ApgEdr_IRequest } from "../interfaces/ApgEdr_IRequest.ts";
import { ApgEdr_Service_Core } from "../services/ApgEdr_Service_Core.ts";




export class ApgEdr_Request implements ApgEdr_IRequest {


    deployment: string;

    counter: number;

    telemetryId: string;

    received: string;

    client: Deno.NetAddr;

    method: string;

    route: string;

    language: Uts.ApgUts_TLanguage;

    startTime: number;

    totalTime: number;

    startMemory: number;

    endMemory: number;

    events: Uts.ApgUts_ILoggableEvent[];

    auth?: ApgEdr_Auth_IJwtPayload

    redirectedFrom?: string[];

    message?: ApgEdr_IMessage;


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


    constructor(
        arequest: Drash.Request,
        adeployment: string,
        acounter: number
    ) {

        this.telemetryId = ApgEdr_Service_Core.GetTelemetryId(arequest);
        this.received = new Date().toUTCString();
        this.client = arequest.conn_info.remoteAddr as Deno.NetAddr;
        this.method = arequest.method;
        this.route = arequest.url;
        this.language = ApgEdr_Service_Core.GetLanguage(arequest);
        this.deployment = adeployment;
        this.counter = acounter;
        this.startTime = performance.now();
        this.totalTime = 0;
        this.startMemory = Uts.ApgUts.GetMemoryUsageMb().rss;
        this.endMemory = 0;
        this.events = [];
    }


    /**
     * Logs an event in the passed Edr request
     */
    Log(
        atype: Uts.ApgUts_eEventType,
        aclassName: string,
        amethodName: string,
        amessage: string
    ) {

        const event = Uts.ApgUts_EventFactory.New(atype, aclassName, amethodName, amessage);

        this.events.push(event);

        if (ApgEdr_Request.DoEventsEcho) {
            this.#Echo(event);
        }

    }



    /**
     * Stores a set of events in the passed request
     */
    LogEvents(
        aevents: Uts.ApgUts_ILoggableEvent[]
    ) {

        for (const event of aevents) {

            this.events.push(event);

            if (ApgEdr_Request.DoEventsEcho) {
                this.#Echo(event);
            }
        }

    }



    LogInfo(
        aclassName: string,
        amethodName: string,
        amessage: string
    ) {
        this.Log(Uts.ApgUts_eEventType.INFO, aclassName, amethodName, amessage);
    }



    LogError(
        aclassName: string,
        amethodName: string,
        amessage: string
    ) {
        this.Log(Uts.ApgUts_eEventType.ERROR, aclassName, amethodName, amessage);
    }



    LogDebug(
        aclassName: string,
        amethodName: string,
        amessage: string
    ) {
        if (ApgEdr_Request.DoDebug) {
            this.Log(Uts.ApgUts_eEventType.DEBUG, aclassName, amethodName, amessage);
        }
    }



    #Echo(
        aevent: Uts.ApgUts_ILoggableEvent
    ) {

        const counter = this.counter.toString().padStart(6, "0");
        const perf = aevent.time.toFixed(2).padStart(12, "0");

        let message = "";

        message = ` #${counter} | ${aevent.type}  | ${aevent.message}`;

        message = this.#colorizeEcho(aevent, message);
        console.log(message);

        if (ApgEdr_Request.DoVerboseEcho) {
            message = `                  | ${perf} | ${aevent.module}.${aevent.method}`;
            console.log(message);
            console.log("");
        }

    }



    #colorizeEcho(
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