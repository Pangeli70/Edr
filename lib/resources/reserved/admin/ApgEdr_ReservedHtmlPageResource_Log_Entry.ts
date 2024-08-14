/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
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



export class ApgEdr_ReservedHtmlPageResource_Log_Entry extends Drash.Resource {

    readonly PATH_PARAM_ID = 'id';

    readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;


    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_LOG_ENTRY + "/:" + this.PATH_PARAM_ID];


    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdrRequest(request);
        if (!ApgEdr_Service.VerifyProtectedPage(edr, this.EDR_ROLE)) {
            this.redirect(ApgEdr_Route_eShared.PAGE_LOGIN, response);
            return;
        }


        const rawId = request.pathParam(this.PATH_PARAM_ID)!;
        const counter = parseInt(rawId!);
        const loggedRequest = ApgEdr_Service.Requests.find(r => r.counter == counter);


        if (!loggedRequest) {
            this.#errorIdNotFound(response, edr, rawId);
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
                isCdnResource: true
            }
        );
    }




    #errorIdNotFound(
        response: Drash.Response,
        aedr: ApgEdr_IRequest,
        arawId: string,
    ) {
        const message = "Request with id " + arawId + " not found";
        ApgEdr_Service.Error(
            import.meta.url,
            this.GET,
            aedr,
            message,
            ApgEdr_Route_eShared.RESERVED_PAGE_LOG
        );

        const errorPage = ApgEdr_Route_eShared.PAGE_ERROR + "/" + aedr.counter.toString();
        this.redirect(errorPage, response);
    }
}
