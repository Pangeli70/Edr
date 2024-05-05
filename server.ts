/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * ----------------------------------------------------------------------------
 */

import { Edr, Tng, BrdEdr_Microservice } from "./srv/deps.ts";
import { BrdEdr_Resources, BrdEdr_Services } from "./srv/mod.ts";



// Setup Edr
Edr.BrdEdr_Service.ClientCacheMaxAge = 1 * 60; // One minute 

// Overwrite default Tengine settings
Tng.BrdTng_Service.Init("./srv/templates", false, 100);

const server = new Edr.Drash.Server({
    hostname: BrdEdr_Microservice.devServerIP,
    port: BrdEdr_Microservice.devServerPort,
    protocol: "http",
    resources: BrdEdr_Resources,
    services: BrdEdr_Services,
});

server.run();

Edr.BrdEdr_Service.ServerStartupResume(BrdEdr_Microservice, server.address);