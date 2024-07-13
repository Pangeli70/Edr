/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 202401056
 * ----------------------------------------------------------------------------
 */


/**
 * Definizione dell'help per i parametri del body della richiesta in POST
 */
export interface BrdEdr_RestHelpParam_IBody {

  /** Nome del parametro */
  name: string;

  /** Tipo del parametro */
  type: string;

  /** Descrizione del parametro */
  description: string[];
}
