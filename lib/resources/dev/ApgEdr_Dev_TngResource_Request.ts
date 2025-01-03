/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/07/08]
 * @version 1.0.1 [APG 2024/07/31] ApgEdr_Service.GetTemplateData
 * @version 1.0.2 [APG 2024/08/13] Moved to lib
 * @version 1.0.3 [APG 2024/09/02] Better permissions management
 * @version 1.0.4 [APG 2024/11/07] Better error management
 * @version 1.0.5 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { ApgEdr_Request } from "../../classes/ApgEdr_Request.ts";
import { Drash } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_eRoute } from "../../enums/ApgEdr_eRoute.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Service_Requests } from "../../services/ApgEdr_Service_Requests.ts";
import { ApgEdr_TngResource_Auth_Base } from "../ApgEdr_TngResource_Auth_Base.ts";



export class ApgEdr_Dev_TngResource_Request

    extends ApgEdr_TngResource_Auth_Base {


    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_Request.name;
    override readonly TITLE = "Logged request details";
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/dev/" + this.RESOURCE_NAME + ".html"
    };
    
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;

    readonly PATH_PARAM_ID = 'id';

    override paths = [ApgEdr_eRoute.DEV_PAGE_REQUEST + "/:" + this.PATH_PARAM_ID];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;


        const rawId = request.pathParam(this.PATH_PARAM_ID)!;
        const counter = parseInt(rawId!);
        const loggedRequest = ApgEdr_Service_Requests.Requests.find(r => r.counter == counter);


        if (!loggedRequest) {
            this.#handleIdNotFoundError(edr, this.GET.name, request, response, rawId);
            return;
        }


        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            this.TITLE,
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )


        templateData.page.data = {
            logRoute: ApgEdr_eRoute.DEV_PAGE_REQUESTS,
            request: loggedRequest
        }


        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
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
            next: ApgEdr_eRoute.DEV_PAGE_REQUESTS
        };

        ApgEdr_Service_Core.HandleError(
            aedr,
            ApgEdr_Dev_TngResource_Request.name,
            this.GET.name,
        );

        this.logAndRedirectToErrorPage(aedr, amethodName, aresponse, arequest.url);
    }
}
