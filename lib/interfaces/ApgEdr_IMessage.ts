/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20241005
 * ----------------------------------------------------------------------------
 */

import {
    Uts
} from "../deps.ts";

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