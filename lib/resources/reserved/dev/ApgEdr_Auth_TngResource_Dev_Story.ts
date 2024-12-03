/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241028
 * ----------------------------------------------------------------------------
*/


import { Drash, Uts } from "../../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Dev_Service } from "../../../services/ApgEdr_Dev_Service.ts";
import { ApgEdr_Service } from "../../../services/ApgEdr_Service.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";



export class ApgEdr_Auth_TngResource_Dev_Story

    extends ApgEdr_Auth_TngResource {
    

    override readonly RESOURCE_NAME = ApgEdr_Auth_TngResource_Dev_Story.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: 'User story by domain',
        IT: "Storie utente per dominio"
    }
    override readonly EDR_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Dev_Story_01.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly PATH_PARAM_ID = 'id';

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_DEV_STORY + '/:' + this.PATH_PARAM_ID];



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
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        templateData.page.data = {
            url: ApgEdr_Route_eShared.RESERVED_PAGE_DEV_STORY,
            story,
            activities,
            entryRoute: ApgEdr_Route_eShared.RESERVED_PAGE_DEV_ACTIVITY,
        }

        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events)
        response.html(html);
    }


}
