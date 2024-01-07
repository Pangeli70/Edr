/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 202401056
 * ----------------------------------------------------------------------------
 */

import {
  BrdEdr_IRestPayloadHelp
} from "./BrdEdr_IRestPayloadHelp.ts";
import {
  BrdEdr_IRestQSParamHelp
} from "./BrdEdr_IRestQSParamHelp.ts";


export interface BrdEdr_IRestGetRouteHelp {
  qsParams: BrdEdr_IRestQSParamHelp[];
  payload: BrdEdr_IRestPayloadHelp;
}
