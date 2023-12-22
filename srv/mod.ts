/** ---------------------------------------------------------------------------
 * @module Brd/Edr
 * @author APG
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * ----------------------------------------------------------------------------
 */
import { Cmn } from "./deps.ts";

import { BrdEdrIndexResource } from "./resources/BrdEdrIndexResource.ts";
import { BrdEdrToolsResource } from "./resources/BrdEdrToolsResource.ts";
import * as Edr from "../lib/mod.ts"

export const BrdEdrServices: Edr.Drash.Service[] = [
    new Edr.BrdEdrAnyRequestService(),
]

export const BrdEdrResources: typeof Edr.Drash.Resource[] = [

    Edr.BrdEdrAnyAssetResource,
    Edr.BrdEdrAnyFileResource,
    Edr.BrdEdrAnyImageResource,

    BrdEdrIndexResource,
    BrdEdrToolsResource,

];

