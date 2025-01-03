/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Admin]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/10/02]
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Drash } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_eRoute } from "../../enums/ApgEdr_eRoute.ts";
import { ApgEdr_Service_Telemetry } from "../../mod.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_TngResource_Auth_Base } from "../ApgEdr_TngResource_Auth_Base.ts";



export class ApgEdr_Dev_TngResource_Telemetry_Purge

    extends ApgEdr_TngResource_Auth_Base {

    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_Telemetry_Purge.name;
    override readonly TITLE = "To be defined";
    override readonly TNG_TEMPLATES = {}
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;
    
    override paths = [ApgEdr_eRoute.DEV_PAGE_TELEMETRY_PURGE];


    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;


        const n = await ApgEdr_Service_Telemetry.Purge()

        const route = ApgEdr_eRoute.PAGE_HOME;
        this.redirect(route, response);
    }


}
