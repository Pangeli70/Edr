/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2024/10/05]
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Uts } from "../deps.ts";


/**
 * Miltilanguage message for the user. 
 */
export interface ApgEdr_IMessage {

    /**
     * Title of the message 
     */
    title: string | Uts.ApgUts_IMultilanguage;

    /**
     * Text of the message
     */
    text: string | Uts.ApgUts_IMultilanguage;

    /**
     * String interpolation parameters for message completion
     */
    params?: string[];

    /**
     * Url to the next page to be displayed after the message was displayed
     */
    next: string;
}