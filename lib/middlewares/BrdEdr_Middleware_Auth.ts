/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * ----------------------------------------------------------------------------
 */


import {
    BrdEdr_Auth_Service
} from "../services/BrdEdr_Auth_Service.ts";
import {
    BrdEdr_Log_Service
} from "../services/BrdEdr_Log_Service.ts";
import {
    BrdEdr_Service
} from "../services/BrdEdr_Service.ts";
import {
    Drash,
    Uts
} from "../deps.ts";
import {
    BrdEdr_Auth_eCookie
} from "../enums/BrdEdr_Auth_eCookie.ts";
import { BrdEdr_Auth_IJwtPayload } from "../interfaces/BrdEdr_Auth_IJwtPayload.ts";



/**
 * Middleware per l'autenticazione
 */
export class BrdEdr_Middleware_Auth extends Drash.Service {


    public async runBeforeResource(
        request: Drash.Request,
        response: Drash.Response,
    ) {

        const edr = BrdEdr_Service.GetEdrRequest(request);

        const authCookie = request.getCookie(BrdEdr_Auth_eCookie.JWT);

        if (authCookie) {
            let r = await BrdEdr_Auth_Service.VerifyJwt(authCookie);

            if (r.ok) {

                edr.auth = r.payload!.data as BrdEdr_Auth_IJwtPayload;

                r = await BrdEdr_Auth_Service.GetJwtCookie(edr.auth.email);
                if (!r.ok) { 
                    throw new Error(r.message);
                }
                response.setCookie(r.payload!.data as Uts.Std.Cookie);
                
                const message = `Authenticated: ${edr.auth.email} and cookie renewed`;
                BrdEdr_Log_Service.LogDebug(edr, import.meta.url, this.runBeforeResource, message);

            }
            else {
                BrdEdr_Log_Service.LogError(edr, import.meta.url, this.runBeforeResource, r.message);
            }
        }

        BrdEdr_Log_Service.LogDebug(edr, import.meta.url, this.runBeforeResource, 'Called');

    }




    public runAfterResource(
        request: Drash.Request,
        _response: Drash.Response
    ): void {

        const edr = BrdEdr_Service.GetEdrRequest(request);
        BrdEdr_Log_Service.LogDebug(edr, import.meta.url, this.runAfterResource, 'Called');

    }

}