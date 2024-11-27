/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * @version 1.3 APG 20240902 Better permissions management
 * @version 1.4 APG 20241107 Better error management
 * ----------------------------------------------------------------------------
 */


import {
    ApgEdr_Request
} from "../../../classes/ApgEdr_Request.ts";
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
    ApgEdr_Log_Service
} from "../../../services/ApgEdr_Log_Service.ts";
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

        const edr = ApgEdr_Service.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;


        const rawId = request.pathParam(this.PATH_PARAM_ID)!;
        const counter = parseInt(rawId!);
        const loggedRequest = ApgEdr_Log_Service.Requests.find(r => r.counter == counter);


        if (!loggedRequest) {
            this.#handleIdNotFoundError(edr, this.GET.name, request, response, rawId);
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




    #handleIdNotFoundError(
        aedr: ApgEdr_Request,
        amethodName: string,
        arequest: Drash.Request,
        aresponse: Drash.Response,
        arawId: string,
    ) {

        aedr.message = {
            title: "Error",
            text: "Request with id " + arawId + " not found",
            next: ApgEdr_Route_eShared.RESERVED_PAGE_LOG
        };

        ApgEdr_Service.HandleError(
            aedr,
            ApgEdr_ReservedHtmlPageResource_Log_Entry.name,
            this.GET.name,
        );

        this.logAndRedirectToErrorPage(aedr, amethodName, aresponse, arequest.url);
    }
}
