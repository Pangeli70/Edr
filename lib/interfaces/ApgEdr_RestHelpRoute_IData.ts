/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 202401056
 * ----------------------------------------------------------------------------
 */

import {ApgEdr_RestHelpRoute_IGet} from "./ApgEdr_RestHelpRoute_IGet.ts";
import {ApgEdr_RestHelpParam_IPath} from "./ApgEdr_RestHelpParam_IPath.ts";
import {ApgEdr_RestHelpRoute_IPost} from "./ApgEdr_RestHelpRoute_IPost.ts";


/**
 * Definizione dell'help per le route della REST API
 */
export interface ApgEdr_RestHelpRoute_IData {


    /** Identificativo della route */
    route: string;

    /** Descrizione della route */
    description: string[];

    /** Parametri del path */
    pathParams?: ApgEdr_RestHelpParam_IPath[];

    /** Help per le chiamate in GET */
    GET?: ApgEdr_RestHelpRoute_IGet;

    /** Help per le chiameate in POST */
    POST?: ApgEdr_RestHelpRoute_IPost;
}
