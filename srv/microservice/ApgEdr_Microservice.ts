/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0.0 [APG 2024/08/13] Cleanup
 * @version 1.0.1 [APG 2024/08/14] Added Version and is deploy
 * @version 1.0.2 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Edr, Uts } from "../deps.ts";

export const ApgEdr_Microservice: Uts.ApgUts_IMicroservice = {
    name: Edr.ApgEdr_Microservice_Name,
    version: "1.0",
    title: "Enhanced Drash Resources",
    isDeploy: Uts.ApgUts_Is.IsDeploy(),
    devServerIP: "localhost",
    devServerPort: 12058
};
