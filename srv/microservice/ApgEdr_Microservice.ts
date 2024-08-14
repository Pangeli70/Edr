/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240813 Cleanup
 * @version 1.1 APG 20240814 Version and is deploy
 * ----------------------------------------------------------------------------
 */

import {
    Uts
} from "../deps.ts";

export const ApgEdr_Microservice: Uts.ApgUts_IMicroservice = {
    name: "ApgEdr",
    version: "1.0",
    title: "Enhanced Drash Resources",
    isDeploy: Uts.ApgUts.IsDenoDeploy(),
    devServerIP: "localhost",
    devServerPort: 12058
};
