/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Admin]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/08/13]
 * @version 1.0.1 [APG 2024/09/02] Better permissions management
 * @version 1.0.2 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { ApgEdr_Request } from "../../classes/ApgEdr_Request.ts";
import { Drash } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_eRoute } from "../../enums/ApgEdr_eRoute.ts";
import { ApgEdr_Service_Auth } from "../../services/ApgEdr_Service_Auth.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_TngResource_Auth_Base } from "../ApgEdr_TngResource_Auth_Base.ts";
import { ApgEdr_Resources_Links } from "../data/ApgEdr_Resources_Links.ts";



export class ApgEdr_Admin_TngResource_User

    extends ApgEdr_TngResource_Auth_Base {


    override readonly RESOURCE_NAME = ApgEdr_Admin_TngResource_User.name;
    override readonly TITLE = "User details";
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/admin/" + this.RESOURCE_NAME + ".html"
    };

    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.ADMIN;

    readonly PATH_PARAM_USER_ID = 'id';

    override paths = [ApgEdr_eRoute.ADMIN_PAGE_USER + "/:" + this.PATH_PARAM_USER_ID];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);

        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const rawId = request.pathParam(this.PATH_PARAM_USER_ID)!;

        const profile = ApgEdr_Service_Auth.Profilations[rawId];
        const role = ApgEdr_Service_Auth.Authorizations[rawId];
        const user = ApgEdr_Service_Auth.Authentications[rawId];

        if (!profile) {
            this.#handleUserNotFoundError(edr, this.GET.name, request, response, rawId);
            return;
        }


        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            this.TITLE,
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const NavBar = [

            ApgEdr_Resources_Links[ApgEdr_eRoute.PAGE_MENU],
            ApgEdr_Resources_Links[ApgEdr_eRoute.PAGE_MENU_ADMIN],
            ApgEdr_Resources_Links[ApgEdr_eRoute.ADMIN_PAGE_USERS],

        ]

        const topMenu = this.getTranslatedLinks(NavBar, edr.language);


        templateData.page.data = {
            topMenu,
            usersRoute: ApgEdr_eRoute.ADMIN_PAGE_USERS,
            unlockRoute: ApgEdr_eRoute.ADMIN_PAGE_USER_UNLOCK,
            profile,
            role,
            user
        }


        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }




    #handleUserNotFoundError(
        aedr: ApgEdr_Request,
        amethodName: string,
        arequest: Drash.Request,
        aresponse: Drash.Response,
        arawId: string,
    ) {

        aedr.message = {
            title: "Error",
            text: "User with email " + arawId + " not found",
            next: ApgEdr_eRoute.ADMIN_PAGE_USERS
        }

        ApgEdr_Service_Core.HandleError(
            aedr,
            ApgEdr_Admin_TngResource_User.name,
            this.GET.name,
        );

        this.logAndRedirectToErrorPage(aedr, amethodName, aresponse, arequest.url);
    }
}
