/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 0.4 APG 20240710 New Middlewares
 * @version 0.5 APG 20240713 Private packages
 * ----------------------------------------------------------------------------
 */

import { loadSync } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
loadSync({ export: true });

import { Edr } from "./mod.ts";

const env = Deno.env.toObject();
for (const k in env) {
    console.log(`${k}=${env[k]}`);
}
const GHPAC = Deno.env.get(Edr.BrdEdr_Env_eEntry.GITHUB_PKG);


if (!GHPAC) {
    throw new Error("Missing github package key in environment");
}
Deno.env.set('DENO_AUTH_TOKENS', GHPAC + "@raw.githubusercontent.com");



import { Tng, BrdEdr_Microservice } from "./srv/deps.ts";
import { BrdEdr_Resources, BrdEdr_Middlewares } from "./srv/mod.ts";


// Setup Edr
Edr.BrdEdr_Service.ClientCacheMaxAge = 1 * 60; // One minute
Edr.BrdEdr_Service.Authorizations = {
    'pangeli70@gmail.com': Edr.BrdEdr_Auth_eRole.ADMIN,
    'paolo.angeli@bredasys.com': Edr.BrdEdr_Auth_eRole.ADMIN
}

Edr.BrdEdr_Service.isSelfHosted = false;
Edr.BrdEdr_Service.RemoteTemplatesPath = "http://localhost:12058/templates";


// Overwrite default Tengine settings
Tng.BrdTng_Service.Init("./srv/templates", false, 100);

const server = new Edr.Drash.Server({
    hostname: BrdEdr_Microservice.devServerIP,
    port: BrdEdr_Microservice.devServerPort,
    protocol: "http",
    resources: BrdEdr_Resources,
    services: BrdEdr_Middlewares,
});

server.run();

Edr.BrdEdr_Service.ServerStartupResume(BrdEdr_Microservice, server.address);