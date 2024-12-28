/** ---------------------------------------------------------------------------
 * @module [ApgEdr_REST]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2024/01/05]
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { ApgEdr_RestHelp_IPathParam } from "./ApgEdr_RestHelp_IPathParam.ts";
import { ApgEdr_RestHelp_IGetRoute } from "./ApgEdr_RestHelp_IGetRoute.ts";
import { ApgEdr_RestHelp_IPostRoute } from "./ApgEdr_RestHelp_IPostRoute.ts";


/**
 *  Autodiscoverability help for a route of REST API
 */
export interface ApgEdr_RestHelp_IRoute {


    /** 
     * Identifier of the route
     */
    route: string;


    description: string[];

    /**
     * Are specific of the route so they are independent from the verb
     */
    pathParams?: ApgEdr_RestHelp_IPathParam[];


    /** 
     * Details for the GET requests
     */
    GET?: ApgEdr_RestHelp_IGetRoute;


    /**
     * Details for the POST requests
     */
    POST?: ApgEdr_RestHelp_IPostRoute;
}
