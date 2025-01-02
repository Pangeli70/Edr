/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0 APG 20241028
 * ----------------------------------------------------------------------------
*/


import { Drash } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Service_DevStories } from "../../services/ApgEdr_Service_DevStories.ts";
import { ApgEdr_TngResource_Auth_Base } from "../ApgEdr_TngResource_Auth_Base.ts";



export class ApgEdr_Dev_TngResource_Story

    extends ApgEdr_TngResource_Auth_Base {


    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_Story.name;
    override readonly TITLE = 'User story';
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/dev/" + this.RESOURCE_NAME + ".html"
    };

    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;

    readonly PATH_PARAM_ID = 'id';

    override paths = [ApgEdr_Route_eShared.DEV_PAGE_STORY + '/:' + this.PATH_PARAM_ID];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;


        const rawId = request.pathParam(this.PATH_PARAM_ID)!;

        const r = await ApgEdr_Service_DevStories.GetStoryById(rawId);
        if (!r.ok) {
            // redirect to error
            return;
        }

        const story = r.payload!;

        const r1 = await ApgEdr_Service_DevStories.ListActivitiesByStory(story.timestampId);

        if (!r1.ok) {
            // redirect to error
            return;
        }

        const activities = r1.payload!;

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            this.TITLE,
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        templateData.page.data = {
            url: ApgEdr_Route_eShared.DEV_PAGE_STORY,
            story,
            activities,
            entryRoute: ApgEdr_Route_eShared.DEV_PAGE_ACTIVITY,
        }

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events)
        response.html(html);
    }


}
