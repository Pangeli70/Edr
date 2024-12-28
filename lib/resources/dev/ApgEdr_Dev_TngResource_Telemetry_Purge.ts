/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Admin]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0.0 [APG 2024/10/02]
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Drash, Uts } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Telemetry } from "../../mod.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";



export class ApgEdr_Dev_TngResource_Telemetry_Purge

    extends ApgEdr_Auth_TngResource {

    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_Telemetry_Purge.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "",
    }
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.ADMIN;
    override readonly TNG_TEMPLATES = {}
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    override paths = [ApgEdr_Route_eShared.DEV_PAGE_TELEMETRY_PURGE];


    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;


        const n = await ApgEdr_Service_Telemetry.Purge()

        const route = ApgEdr_Route_eShared.PAGE_HOME;
        this.redirect(route, response);
    }


}
