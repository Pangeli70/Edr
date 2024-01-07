/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * ----------------------------------------------------------------------------
 */

import { Drash } from "../deps.ts";

export class BrdEdr_AnyRequest_Service extends Drash.Service {

  private static counter = 0;


  public runBeforeResource(
    request: Drash.Request,
    _response: Drash.Response,
  ): void {
    BrdEdr_AnyRequest_Service.counter++;
    
    const now = new Date().toLocaleTimeString();
    const addr = request.conn_info.remoteAddr as Deno.NetAddr;

    console.log(` #${BrdEdr_AnyRequest_Service.counter} (${now}): [${addr.hostname}] ${request.url}`)
    
  }
}

