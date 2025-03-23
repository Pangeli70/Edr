/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 APG 20241023
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
*/


import { Drash } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_eRoute } from "../../enums/ApgEdr_eRoute.ts";
import { ApgEdr_Dev_IStory } from "../../interfaces/ApgEdr_Dev_IStory.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Service_DevStories } from "../../services/ApgEdr_Service_DevStories.ts";
import { ApgEdr_TngResource_Auth_Base } from "../ApgEdr_TngResource_Auth_Base.ts";
import { ApgEdr_Resources_Links } from "../data/ApgEdr_Resources_Links.ts";



const NavBar = [

    ApgEdr_Resources_Links[ApgEdr_eRoute.PAGE_HOME],
    ApgEdr_Resources_Links[ApgEdr_eRoute.PAGE_MENU_DEV],

]


export class ApgEdr_Dev_TngResource_Stories

    extends ApgEdr_TngResource_Auth_Base {


    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_Stories.name;
    override readonly TITLE = 'User stories';
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/dev/" + this.RESOURCE_NAME + ".html"
    };

    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;

    override paths = [ApgEdr_eRoute.DEV_PAGE_STORIES];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;


        const r = await ApgEdr_Service_DevStories.GetStoryDomains();
        if (!r.ok) {
            // TODO manage this error -- APG 20241202
            // redirect to error
            return;
        }

        const domains = r.payload!;

        const r1 = await ApgEdr_Service_DevStories.ListStoriesByDomain(domains[0]);

        if (!r1.ok) {
            // redirect to error
            return;
        }

        const filteredStories = r1.payload!;
        const stories = this.#sortStories(filteredStories);

        const templateData = ApgEdr_Service_Core.GetTngData(edr, this, 'GET');


        const topMenu = this.getTranslatedLinks(NavBar, edr.language);


        templateData.page.data = {
            topMenu,
            url: ApgEdr_eRoute.DEV_PAGE_STORIES,
            domains,
            stories,
            entryRoute: ApgEdr_eRoute.DEV_PAGE_STORY,
        }

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
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
