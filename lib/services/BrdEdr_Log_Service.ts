/** ---------------------------------------------------------------------------
 * @module [BrdEdr_Log]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240707 Extracted from BrdEdr_Service
 * ----------------------------------------------------------------------------
 */


import {
    Uts
} from "../deps.ts";
import {
    BrdEdr_IRequest
} from "../interfaces/BrdEdr_IRequest.ts";



/**
 * Servizio per gestire la registrazione degli eventi in un server Edr
 */
export class BrdEdr_Log_Service {


    /** Log the debug events */
    static IsDebug = false;

    /** Console log of events */
    static DoEventsEcho = true;

    /** Console log additional info */
    static DoVerboseEcho = true;


    /** Registra un evento nella richiesta corrente */
    static Log(
        aedr: BrdEdr_IRequest,
        atype: Uts.BrdUts_eLogType,
        aurl: string,
        afunction: Function,
        amessage: string
    ) {

        const module = aurl.split('/').pop()!.split('.')[0];

        const event: Uts.BrdUts_ILogEvent = {
            created: new Date(),
            time: performance.now(),
            type: atype,
            module,
            function: afunction,
            message: amessage
        }
        aedr.events.push(event);

        if (this.DoEventsEcho) {
            BrdEdr_Log_Service.#Echo(aedr, event );
        }

    }


    /** Registra gli eventi nella richiesta corrente */
    static LogEvents(
        arequest: BrdEdr_IRequest,
        aevents: Uts.BrdUts_ILogEvent[]
    ) {

        for (const event of aevents) {

            arequest.events.push(event);

            if (this.DoEventsEcho) {
                BrdEdr_Log_Service.#Echo(arequest, event);
            }
        }

    }



    static #Echo(
        arequest: BrdEdr_IRequest,
        aevent: Uts.BrdUts_ILogEvent
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



    /** Registra una informazione nella richiesta corrente */
    static LogInfo(
        arequest: BrdEdr_IRequest,
        aurl: string,
        afunction: Function,
        amessage: string
    ) {
        this.Log(arequest, Uts.BrdUts_eLogType.INFO, aurl, afunction, amessage);
    }

    static LogError(
        arequest: BrdEdr_IRequest,
        aurl: string,
        afunction: Function,
        amessage: string
    ) {
        this.Log(arequest, Uts.BrdUts_eLogType.ERROR, aurl, afunction, amessage);
    }


    static LogDebug(
        arequest: BrdEdr_IRequest,
        aurl: string,
        afunction: Function,
        amessage: string
    ) {
        if (this.IsDebug) {
            this.Log(arequest, Uts.BrdUts_eLogType.DEBUG, aurl, afunction, amessage);
        }
    }




}