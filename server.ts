/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
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


const env = Deno.env.toObject();
for (const k in env) {
    console.log(`${k}=${env[k]}`);
}

const GHPAC = Deno.env.get("APG_EDR_GITHUB_PRIVATE_KEY");

if (!GHPAC) {
    throw new Error("Missing github package key in environment");
}
Deno.env.set('DENO_AUTH_TOKENS', GHPAC + "@raw.githubusercontent.com");



import { Edr, Tng, ApgEdr_Microservice } from "./srv/deps.ts";
import { ApgEdr_Resources, ApgEdr_Middlewares } from "./srv/mod.ts";


// Setup Edr
Edr.ApgEdr_Service.ClientCacheMaxAge = 10 * 60; // 10 minutes
Edr.ApgEdr_Service.Authorizations = {
    'pangeli70@gmail.com': Edr.ApgEdr_Auth_eRole.ADMIN,
}

// This is the Edr server so we can't use remote templates
Edr.ApgEdr_Service.IsSelfHosted = true;


// Overwrite default Tengine settings
Tng.ApgTng_Service.Init("./srv/templates", false, 100);

const server = new Edr.Drash.Server({
    hostname: ApgEdr_Microservice.devServerIP,
    port: ApgEdr_Microservice.devServerPort,
    protocol: "http",
    resources: ApgEdr_Resources,
    services: ApgEdr_Middlewares,
});

server.run();

Edr.ApgEdr_Service.StartupResume(ApgEdr_Microservice, server.address);