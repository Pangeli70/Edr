/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240704
 * ----------------------------------------------------------------------------
 */

import { Uts } from "../deps.ts";
import { BrdEdr_Auth_IJwtPayload } from "../mod.ts";



/**
 * Dati iniettati dai middleware nella richiesta as server Drash
 */
export interface BrdEdr_IRequest {

    /** Numero di richiesta  ricevuta */
    counter: number;

    /** Tempo del server in millisecondi dall'ultimo avvio */
    startTime: number;

    /** Data ora di ricevimento della richiesta */
    received: string;

    /** Indirizzo richiesto */
    route: string;

    /** Modalità della richiesta */
    method: string;

    /** Dati del client */
    remoteAddr: Deno.NetAddr;

    /** Utilizzo della memoria al ricevimento della richiesta */
    startMemory: number;

    /**
     * Eventi occorsi durante l'elaborazione della richiesta
     */
    events: Uts.BrdUts_ILogEvent[];

    /** L'utente è autenticato */
    auth?: BrdEdr_Auth_IJwtPayload


    /** Tempo totale del server in millisecondi dal ricevimento della richiesta */
    totalTime: number;

    /** Utilizzo della memoria all'invio della risposta */
    endMemory: number;


}



