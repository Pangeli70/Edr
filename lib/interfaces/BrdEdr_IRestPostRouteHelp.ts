/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 202401056
 * ----------------------------------------------------------------------------
 */

import {
  BrdEdr_IRestBodyParamHelp
} from "./BrdEdr_IRestBodyParamHelp.ts";
import {
  BrdEdr_IRestPayloadHelp
} from "./BrdEdr_IRestPayloadHelp.ts";




export interface BrdEdr_IRestPostRouteHelp {
  bodyParams: BrdEdr_IRestBodyParamHelp[];
  payload: BrdEdr_IRestPayloadHelp;
}
