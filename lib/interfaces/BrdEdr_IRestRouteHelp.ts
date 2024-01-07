/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 202401056
 * ----------------------------------------------------------------------------
 */

import {
  BrdEdr_IRestGetRouteHelp
} from "./BrdEdr_IRestGetRouteHelp.ts";
import {
  BrdEdr_IRestPathParamHelp
} from "./BrdEdr_IRestPathParamHelp.ts";
import {
  BrdEdr_IRestPostRouteHelp
} from "./BrdEdr_IRestPostRouteHelp.ts";




export interface BrdEdr_IRestRouteHelp {

  route: string;

  description: string | string[];

  pathParams?: BrdEdr_IRestPathParamHelp[];

  GET?: BrdEdr_IRestGetRouteHelp;

  POST?: BrdEdr_IRestPostRouteHelp;
}
