/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241023
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
    ApgEdr_Dev_IStory
} from "../../../interfaces/ApgEdr_Dev_IActivity.ts";
import {
    ApgEdr_Dev_Service
} from "../../../services/ApgEdr_Dev_Service.ts";
import {
    ApgEdr_Service
} from "../../../services/ApgEdr_Service.ts";
import {
    ApgEdr_Shared_Links
} from "../../data/ApgEdr_Resources_Links.ts";
import {
    ApgEdr_ReservedHtmlPageResource
} from "../ApgEdr_ReservedHtmlPageResource.ts";



export const NavBar = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_HOME],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_DEV],

]



export class ApgEdr_ReservedHtmlPageResource_Dev_Stories

    extends ApgEdr_ReservedHtmlPageResource {


    override readonly RESOURCE_NAME = ApgEdr_ReservedHtmlPageResource_Dev_Stories.name;
    override readonly EDR_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/reserved/admin/ApgEdr_Dev_StoriesByDomain_ReservedHtmlPageTemplate_01.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_DEV_STORIES];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);
        //   if (!this.verifyPermissions(this.GET, request, response, edr)) return;


        const r = await ApgEdr_Dev_Service.GetStoryDomains();
        if (!r.ok) {
            // redirect to error
            return;
        }

        const domains = r.payload!;

        const r1 = await ApgEdr_Dev_Service.ListStoriesByDomain(domains[0]);

        if (!r1.ok) {
            // redirect to error
            return;
        }

        const filteredStories = r1.payload!;
        const stories = this.#sortStories(filteredStories);

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Stories by domain',
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )


        const topMenu = this.getTranslatedLinks(NavBar, edr.language);


        templateData.page.data = {
            topMenu,
            url: ApgEdr_Route_eShared.RESERVED_PAGE_DEV_STORIES,
            domains,
            stories,
            entryRoute: ApgEdr_Route_eShared.RESERVED_PAGE_DEV_STORY,
        }

        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events)
        response.html(html);
    }



    #sortStories(astories: ApgEdr_Dev_IStory[]) {

        return astories.sort((a, b) => {
            const firstCompare = a.domain.localeCompare(b.domain);
            if (firstCompare == 0) {
                const secondCompare = a.owner.localeCompare(b.owner);
                if (secondCompare == 0) {
                    const thirdCompare = a.feasibility.localeCompare(b.feasibility);
                    if (thirdCompare == 0) {
                        return a.timestampId.localeCompare(b.timestampId);
                    }
                    return thirdCompare;
                }
                return secondCompare;
            }
            return firstCompare;
        });
    }
}
