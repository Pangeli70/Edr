/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20230710 New implementation
 * @version 0.4 APG 20240726 English comments
 * ----------------------------------------------------------------------------
 */

import {
    Drash,
    Uts
} from "../deps.ts";
import {
    ApgEdr_Auth_eCookie
} from "../enums/ApgEdr_Auth_eCookie.ts";
import {
    ApgEdr_Auth_IJwtPayload
} from "../interfaces/ApgEdr_Auth_IJwtPayload.ts";
import {
    ApgEdr_Auth_Service
} from "../services/ApgEdr_Auth_Service.ts";
import {
    ApgEdr_Log_Service
} from "../services/ApgEdr_Log_Service.ts";
import {
    ApgEdr_Service
} from "../services/ApgEdr_Service.ts";



/**
 * Middleware for authentication
 */
export class ApgEdr_Middleware_Auth extends Drash.Service {


    override async runBeforeResource(
        request: Drash.Request,
        response: Drash.Response,
    ) {


        const edr = ApgEdr_Service.GetEdrRequest(request);

        ApgEdr_Log_Service.LogDebug(edr, import.meta.url, this.runBeforeResource, 'Called');

        const authCookie = request.getCookie(ApgEdr_Auth_eCookie.JWT);

        if (authCookie) {
            let r = await ApgEdr_Auth_Service.VerifyJwt(authCookie);

            if (r.ok) {

                edr.auth = r.payload!.data as ApgEdr_Auth_IJwtPayload;

                r = await ApgEdr_Auth_Service.GetJwtCookie(edr.auth.email, edr.auth.session);
                if (!r.ok) {
                    throw new Error(r.message);
                }
                response.setCookie(r.payload!.data as Uts.Std.Cookie);

                const message = `Authenticated: ${edr.auth.email} and cookie renewed`;
                ApgEdr_Log_Service.Log(edr, Uts.ApgUts_eLogType.AUTH, import.meta.url, this.runBeforeResource, message);

            }
            else {
                ApgEdr_Log_Service.LogError(edr, import.meta.url, this.runBeforeResource, r.message);
            }
        }



    }




    override runAfterResource(
        request: Drash.Request,
        _response: Drash.Response
    ): void {

        const edr = ApgEdr_Service.GetEdrRequest(request);
        ApgEdr_Log_Service.LogDebug(edr, import.meta.url, this.runAfterResource, 'Called');

    }

}