/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * ----------------------------------------------------------------------------
 */

import { Uts } from "../../Uts/mod.ts";

export const BrdEdr_Microservice: Uts.BrdUts_IMicroservice = {
    name: "BrdEdr",
    description: "Breda Enhanced Drash Resources",
    devServerIP: "localhost",
    devServerPort: 12052
};


export * as Edr from "../lib/mod.ts";

// Local monorepo
export * from "../../Tng/mod.ts";
export * from "../../Uts/mod.ts";

