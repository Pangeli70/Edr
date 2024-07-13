/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 202401056
 * ----------------------------------------------------------------------------
 */

import {
  BrdEdr_RestHelpRoute_IGet
} from "./BrdEdr_RestHelpRoute_IGet.ts";
import {
  BrdEdr_RestHelpParam_IPath
} from "./BrdEdr_RestHelpParam_IPath.ts";
import {
  BrdEdr_RestHelpRoute_IPost
} from "./BrdEdr_RestHelpRoute_IPost.ts";


/**
 * Definizione dell'help per le route della REST API
 */
export interface BrdEdr_RestHelpRoute_I {


  /** Identificativo della route */
  route: string;

  /** Descrizione della route */
  description: string[];

  /** Parametri del path */
  pathParams?: BrdEdr_RestHelpParam_IPath[];

  /** Help per le chiamate in GET */
  GET?: BrdEdr_RestHelpRoute_IGet;

  /** Help per le chiameate in POST */
  POST?: BrdEdr_RestHelpRoute_IPost;
}
