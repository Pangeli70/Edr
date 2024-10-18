/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * @version 1.3 APG 20240902 Better permissions management
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
    ApgEdr_IRequest
} from "../../../mod.ts";
import {
    ApgEdr_Service
} from "../../../services/ApgEdr_Service.ts";
import {
    ApgEdr_ReservedHtmlPageResource
} from "../ApgEdr_ReservedHtmlPageResource.ts";



export class ApgEdr_ReservedHtmlPageResource_Log_Entry
    extends ApgEdr_ReservedHtmlPageResource {

    readonly PATH_PARAM_ID = 'id';

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_LOG_ENTRY + "/:" + this.PATH_PARAM_ID];

    override readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;
    override readonly RESOURCE_NAME = ApgEdr_ReservedHtmlPageResource_Log_Entry.name;


    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdrRequest(request);
        if (!this.verifyPermissions(this.GET, request, response, edr)) return;


        const rawId = request.pathParam(this.PATH_PARAM_ID)!;
        const counter = parseInt(rawId!);
        const loggedRequest = ApgEdr_Service.Requests.find(r => r.counter == counter);


        if (!loggedRequest) {
            this.#errorIdNotFound(this.GET, request, response, edr, rawId);
            return;
        }


        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Logged request',
            "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Log_Entry_01.html",
        )


        templateData.page.data = {
            logRoute: ApgEdr_Route_eShared.RESERVED_PAGE_LOG,
            request: loggedRequest
        }


        await ApgEdr_Service.RenderPageUsingTng(
            request,
            response,
            templateData,
            {
                isCdnTemplate: true
            }
        );
    }




    #errorIdNotFound(
        amethod: Function,
        arequest: Drash.Request,
        aresponse: Drash.Response,
        aedr: ApgEdr_IRequest,
        arawId: string,
    ) {

        aedr.message = {
            title: "Error",
            text: "Request with id " + arawId + " not found",
            next: ApgEdr_Route_eShared.RESERVED_PAGE_LOG
        };

        ApgEdr_Service.Error(
            ApgEdr_ReservedHtmlPageResource_Log_Entry.name,
            this.GET,
            aedr
        );

        this.loggedRedirectToError(amethod, aresponse, aedr, arequest.url);
    }
}
