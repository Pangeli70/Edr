/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 0.4 APG 20240710 New Middlewares
 * @version 0.5 APG 20240713 Private packages
 * @version 0.6 APG 20240808 Auto load env using --env command line param
 * ----------------------------------------------------------------------------
 */


//==============================================================================
// Start loading env data 
//==============================================================================

import { loadSync } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
loadSync({ export: true });

console.log('------------------------------------------------------------------------\n');
console.log('Starting Deno server...\n');
console.log('Printing env vars ...\n');

const env = Deno.env.toObject();
for (const k in env) {
    if (k.startsWith("APG_")) {
        console.log(`  ${k}=${env[k]}`);
    }
}


// Setting access to private github repositories 
const key = Deno.env.get("APG_EDR_GITHUB_PRIVATE_KEY");
if (!key) {
    throw new Error("Missing github private package key in environment");
}
Deno.env.set('DENO_AUTH_TOKENS', key + "@raw.githubusercontent.com");


//==============================================================================
// When env data is in place start loading services modules
//==============================================================================


import { Edr, Mng, Specs, Tng } from "./srv/deps.ts";
import {
    ApgEdr_Auth_Authentications,
    ApgEdr_Auth_Authorizations,
    ApgEdr_Auth_Profilations,
    ApgEdr_Microservice,
    ApgEdr_Middlewares,
    ApgEdr_Resources
} from "./srv/mod.ts";


// Setup Requests Logger
Edr.ApgEdr_Request.DoEventsEcho = true;
Edr.ApgEdr_Request.DoVerboseEcho = false;
Edr.ApgEdr_Request.DoDebug = false;


// Setup edr
Edr.ApgEdr_Service_Core.Microservice = ApgEdr_Microservice;
//Edr.ApgEdr_Service_Core.ClientCacheMaxAge = 10 * 60; // 10 minutes
Edr.ApgEdr_Service_Core.UseCdn = false;


// Setup env customization
// Edr.ApgEdr_Service.DefaultFavicon = "ApgEdr_Favicon_Breda_2024_V01";
// Edr.ApgEdr_Service.DefaultLogoJs = "ApgEdr_Logo3D_Breda_2024_V01";


// Setup MongoDb support
Mng.ApgMng_Service.Setup(Edr.ApgEdr_Microservice_Name, true, true);
Mng.ApgMng_Service.InitOrPanic();


// Setup MongoDB Telemetry
Edr.ApgEdr_Service_Telemetry.Setup(5);


// Setup Dev tracking
Edr.ApgEdr_Service_DevStories.Setup(Edr.ApgEdr_Microservice_Name);


// Setup Tng
Tng.ApgTng_Service.TemplatesPath = "./srv/templates";
Tng.ApgTng_Service.UseCache = false;
Tng.ApgTng_Service.ChunkSize = 100;


// Setup Edr Auth
Edr.ApgEdr_Service_Auth.Authentications = ApgEdr_Auth_Authentications;
Edr.ApgEdr_Service_Auth.Authorizations = ApgEdr_Auth_Authorizations;
Edr.ApgEdr_Service_Auth.Profilations = ApgEdr_Auth_Profilations;


// Setup Edr Test Suites
Edr.ApgEdr_Service_TddSpec.AddSuite({
    name: Specs.ApgSpc_Spec_ApgUts_Math.name,
    spec: new Specs.ApgSpc_Spec_ApgUts_Math(),
    results: []
});
Edr.ApgEdr_Service_TddSpec.AddSuite({
    name: Specs.ApgSpc_Spec_ApgUts_Object.name,
    spec: new Specs.ApgSpc_Spec_ApgUts_Object(),
    results: []
})




//==============================================================================
// When services are in place run the server
//==============================================================================

const server = new Edr.Drash.Server({
    hostname: Edr.ApgEdr_Service_Core.Microservice.devServerIP,
    port: Edr.ApgEdr_Service_Core.Microservice.devServerPort,
    protocol: "http",
    resources: ApgEdr_Resources,
    services: ApgEdr_Middlewares,
});

server.run();

Edr.ApgEdr_Service_Core.StartupResume(Edr.ApgEdr_Service_Core.Microservice, server.address);