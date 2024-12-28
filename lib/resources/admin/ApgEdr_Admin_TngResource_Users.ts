/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Admin]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0.0 [APG 2024/08/13]
 * @version 1.0.1 [APG 2024/09/02] Better permissions management
 * @version 1.0.2 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
*/


import { Drash, Uts } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Auth_IProfile } from "../../interfaces/ApgEdr_Auth_IProfile.ts";
import { ApgEdr_Service_Auth } from "../../services/ApgEdr_Service_Auth.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";
import { ApgEdr_Shared_Links } from "../data/ApgEdr_Resources_Links.ts";





export class ApgEdr_Admin_TngResource_Users

    extends ApgEdr_Auth_TngResource {


    override readonly RESOURCE_NAME = ApgEdr_Admin_TngResource_Users.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Registerd users",
    }
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.ADMIN;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/admin/" + this.RESOURCE_NAME + ".html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    override paths = [ApgEdr_Route_eShared.ADMIN_PAGE_USERS];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);

        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const NavBar = [

            ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU],
            ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_ADMIN],

        ]

        const topMenu = this.getTranslatedLinks(NavBar, edr.language);

        const profiles: ApgEdr_Auth_IProfile[] = [];
        for (const profile in ApgEdr_Service_Auth.Profilations) {
            profiles.push(ApgEdr_Service_Auth.Profilations[profile])
        }

        templateData.page.data = {
            topMenu,
            userRoute: ApgEdr_Route_eShared.ADMIN_PAGE_USER,
            profiles
        }

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }





}
