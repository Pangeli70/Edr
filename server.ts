/** ---------------------------------------------------------------------------
 * @module Brd/Edr
 * @author APG
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * ----------------------------------------------------------------------------
 */

import { Edr, Tng, Uts } from "./srv/deps.ts";
import { BrdEdrResources, BrdEdrServices } from "./srv/mod.ts";


const BrdEdrMicroservice: Uts.BrdUts_IMicroservice = {
    name: "Brd/Edr",
    description: "Enhanced Drash resources",
    devServerIP: "localhost",
    devServerPort: 12052
};

// Setup Edr
Edr.BrdEdrService.ClientCacheMaxAge = 1 * 60; // One minute 

// Overwrite default Tengine settings
Tng.BrdTngService.Init("./srv/templates", false, 100);

const server = new Edr.Drash.Server({
    hostname: BrdEdrMicroservice.devServerIP,
    port: BrdEdrMicroservice.devServerPort,
    protocol: "http",
    resources: BrdEdrResources,
    services: BrdEdrServices,
});

server.run();

Edr.BrdEdrService.ServerStartupResume(BrdEdrMicroservice, server.address);