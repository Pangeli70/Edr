/** ---------------------------------------------------------------------------
 * @module Brd/Edr
 * @author APG
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * ----------------------------------------------------------------------------
 */

import { Dir } from "../../Dir/mod.ts";
export const BrdEdrMicroservice = Dir.BrdDirData[Dir.eBrdDirEntries.Edr];

export * as Edr from "../lib/mod.ts";

// Local monorepo
export * from "../../Uts/mod.ts";
export * from "../../Tng/mod.ts";
export * from "../../Uts/mod.ts";
export * from "../../Cmn/mod.ts";