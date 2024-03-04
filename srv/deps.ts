/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * ----------------------------------------------------------------------------
 */
import * as Dotenv from "https://deno.land/std@0.211.0/dotenv/mod.ts";
const _env = await Dotenv.load();

export * as Edr from "../lib/mod.ts";


export * from "./services/BrdEdr_Microservice.ts"

// Github repo
//export * from "https://raw.githubusercontent.com/Bredasys/Uts/master/mod.ts";
//export * from "https://raw.githubusercontent.com/Bredasys/Tng/master/mod.ts";

// Local monorepo
export * from "../../Tng/mod.ts";
export * from "../../Uts/mod.ts";

