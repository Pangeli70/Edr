/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241028
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
    ApgEdr_Dev_Service
} from "../../../services/ApgEdr_Dev_Service.ts";
import {
    ApgEdr_Service
} from "../../../services/ApgEdr_Service.ts";
import {
    ApgEdr_ReservedHtmlPageResource
} from "../ApgEdr_ReservedHtmlPageResource.ts";



export class ApgEdr_ReservedHtmlPageResource_Dev_Story
    extends ApgEdr_ReservedHtmlPageResource {
    
    readonly PATH_PARAM_ID = 'id';

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_DEV_STORY + '/:' + this.PATH_PARAM_ID];

    override readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;
    override readonly RESOURCE_NAME = ApgEdr_ReservedHtmlPageResource_Dev_Story.name;



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);
     //   if (!this.verifyPermissions(this.GET, request, response, edr)) return;

        
        const rawId = request.pathParam(this.PATH_PARAM_ID)!;

        const r = await ApgEdr_Dev_Service.GetStoryById(rawId);
        if (!r.ok) {
            // redirect to error
            return;
        }

        const story = r.payload!;

        const r1 = await ApgEdr_Dev_Service.ListActivitiesByStory(story.timestampId);

        if (!r1.ok) {
            // redirect to error
            return;
        }

        const activities = r1.payload!;

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Story ' + story.timestampId + ' details',
            "/pages/reserved/admin/ApgEdr_Dev_Story_ReservedHtmlPageTemplate_01.html",
        )

        templateData.page.data = {
            url: ApgEdr_Route_eShared.RESERVED_PAGE_DEV_STORY,
            story,
            activities,
            entryRoute: ApgEdr_Route_eShared.RESERVED_PAGE_DEV_ACTIVITY,
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


}
