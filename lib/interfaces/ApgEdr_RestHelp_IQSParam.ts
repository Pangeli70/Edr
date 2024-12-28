/** ---------------------------------------------------------------------------
 * @module [ApgEdr_REST]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2024/01/06]
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


/**
 * Querystring param description for request for autodiscoverability help of REST API
 */
export interface ApgEdr_RestHelp_IQSParam {

    
    name: string;


    type: string;
    

    description: string[];

    /**
     * Possible values if the param is an enum
     */
    values?: string[];
}


