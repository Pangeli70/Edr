/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Auth]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2022/09/09] Alpha version
 * @version 0.9.2 [APG 2023/04/16] Moved to its own microservice
 * @version 0.9.3 [APG 2023/07/10] New implementation
 * @version 0.9.4 [APG 2024/07/26] English comments
 * @version 0.9.5 [APG 2024/11/07] Better logging
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Drash, Uts } from "../deps.ts";
import { ApgEdr_Auth_eCookie } from "../enums/ApgEdr_Auth_eCookie.ts";
import { ApgEdr_Auth_IJwtPayload } from "../interfaces/ApgEdr_Auth_IJwtPayload.ts";
import { ApgEdr_Service_Auth } from "../services/ApgEdr_Service_Auth.ts";
import { ApgEdr_Service_Core } from "../services/ApgEdr_Service_Core.ts";



/**
 * Middleware for authentication
 */
export class ApgEdr_Middleware_Auth extends Drash.Service {


    override async runBeforeResource(
        request: Drash.Request,
        response: Drash.Response,
    ) {


        const edr = ApgEdr_Service_Core.GetEdr(request);

        edr.LogDebug(
            ApgEdr_Middleware_Auth.name,
            this.runBeforeResource.name,
            'Called'
        );

        const authCookie = request.getCookie(ApgEdr_Auth_eCookie.JWT);

        if (authCookie) {
            let r = await ApgEdr_Service_Auth.VerifyJwt(authCookie);

            if (r.ok) {

                edr.auth = r.payload as ApgEdr_Auth_IJwtPayload;

                r = await ApgEdr_Service_Auth.GetJwtCookie(edr.auth.email);
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

        const edr = ApgEdr_Service_Core.GetEdr(request);
        edr.LogDebug(
            ApgEdr_Middleware_Auth.name,
            this.runAfterResource.name,
            'Called'
        );

    }

}