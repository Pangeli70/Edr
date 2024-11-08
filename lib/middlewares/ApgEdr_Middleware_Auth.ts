/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20230710 New implementation
 * @version 0.4 APG 20240726 English comments
 * @version 0.5 APG 20241107 Better logging
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


        const edr = ApgEdr_Service.GetEdr(request);

        edr.LogDebug(
            ApgEdr_Middleware_Auth.name,
            this.runBeforeResource.name,
            'Called'
        );

        const authCookie = request.getCookie(ApgEdr_Auth_eCookie.JWT);

        if (authCookie) {
            let r = await ApgEdr_Auth_Service.VerifyJwt(authCookie);

            if (r.ok) {

                edr.auth = r.payload as ApgEdr_Auth_IJwtPayload;

                r = await ApgEdr_Auth_Service.GetJwtCookie(edr.auth.email);
                if (!r.ok) {
                    throw new Error(r.joinMessages());
                }
                response.setCookie(r.payload as Uts.Std.Cookie);

                const message = `Authenticated: ${edr.auth.email} and cookie renewed`;
                edr.Log(
                    Uts.ApgUts_eEventType.AUTH,
                    ApgEdr_Middleware_Auth.name,
                    this.runBeforeResource.name,
                    message
                );

            }
            else {
                edr.LogError(
                    ApgEdr_Middleware_Auth.name,
                    this.runBeforeResource.name,
                    r.joinMessages()
                );
            }
        }



    }




    override runAfterResource(
        request: Drash.Request,
        _response: Drash.Response
    ): void {

        const edr = ApgEdr_Service.GetEdr(request);
        edr.LogDebug(
            ApgEdr_Middleware_Auth.name,
            this.runAfterResource.name,
            'Called'
        );

    }

}