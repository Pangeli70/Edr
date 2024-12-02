/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241002
 * ----------------------------------------------------------------------------
 */


import {
    Drash
} from "../../../deps.ts";
import {
    ApgEdr_Auth_eRole
} from "../../../enums/ApgEdr_Auth_eRole.ts";
import {
    ApgEdr_Route_eShared
} from "../../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_Telemetry_Service
} from "../../../mod.ts";
import {
    ApgEdr_Service
} from "../../../services/ApgEdr_Service.ts";
import {
    ApgEdr_ReservedHtmlPageResource
} from "../ApgEdr_ReservedHtmlPageResource.ts";



export class ApgEdr_ReservedHtmlPageResource_Telemetry_Purge

    extends ApgEdr_ReservedHtmlPageResource {

    override readonly RESOURCE_NAME = ApgEdr_ReservedHtmlPageResource_Telemetry_Purge.name;
    override readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;
    override readonly TNG_TEMPLATES = {}
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_TELEMETRY_PURGE];


    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;


        const n = await ApgEdr_Telemetry_Service.Purge()

        const route = ApgEdr_Route_eShared.PAGE_HOME;
        this.redirect(route, response);
    }


}
