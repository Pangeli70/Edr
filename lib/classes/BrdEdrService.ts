/** ---------------------------------------------------------------------------
 * @module Brd/Edr
 * @author APG
 * @version 0.2 APG 20230416 Moved to its own microservice
 * ----------------------------------------------------------------------------
 */

import { Dir } from "../deps.ts";

export class BrdEdrService {

    /** In seconds */
    static ClientCacheMaxAge = 0;

    /** Local relative path to */
    static AssetsPath = "./srv";

    private static _missingImage = "/assets/img/missing.png";

    /** Default missing image placeholder*/
    static get MissingImage() {
        return this.AssetsPath + this._missingImage;
    }

    static get IsDenoDeploy() {
        return Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;
    }

    static ServerStartupResume(amicroservice: Dir.IBrdDirDirectory, aaddress:string) {
        const start = new Date();
        console.log(`********************************************************************`)
        console.log('');
        console.log(amicroservice.name);
        console.log(amicroservice.description);
        console.log('');
        console.log(`Server started at ${start.toLocaleString()}`);
        console.log(`Running at ${aaddress}.`);
        console.log('');
        console.log(`********************************************************************`)
    }
}