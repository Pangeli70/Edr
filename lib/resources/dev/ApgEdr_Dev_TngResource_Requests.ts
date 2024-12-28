/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/07/08]
 * @version 1.0.1 [APG 2024/07/31] ApgEdr_Service.GetTemplateData
 * @version 1.0.2 [APG 2024/08/13] Moved to lib
 * @version 1.0.3 [APG 2024/09/02] Better permissions management
 * @version 1.0.4 [APG 2024/10/07] Pagination
 * @version 1.0.5 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
*/


import { Drash, Tng, Uts } from "../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_IRequest } from "../../interfaces/ApgEdr_IRequest.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_Service_Requests } from "../../services/ApgEdr_Service_Requests.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";
import { ApgEdr_Shared_Links } from "../data/ApgEdr_Resources_Links.ts";


const NavBar = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_HOME],
    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU_DEV],

]



export class ApgEdr_Dev_TngResource_Requests

    extends ApgEdr_Auth_TngResource {


    override readonly RESOURCE_NAME = ApgEdr_Dev_TngResource_Requests.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Log of the requests",
    }
    override readonly AUTH_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/dev/" + this.RESOURCE_NAME + ".html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    override paths = [ApgEdr_Route_eShared.DEV_PAGE_REQUESTS];

    readonly QS_PARAM_PAGINATION = 'page';
    readonly PAGINATION_SIZE = 20;



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const rawPage = request.queryParam(this.QS_PARAM_PAGINATION);

        let page = 1;
        if (rawPage) {
            if (Uts.ApgUts_Is.IsInteger(rawPage)) {
                page = parseInt(rawPage);
            }
        }

        const baseUrl = `${ApgEdr_Route_eShared.DEV_PAGE_REQUESTS}?${this.QS_PARAM_PAGINATION}=`

        const pagination: Tng.ApgTng_IPagination = this.getPagination(
            ApgEdr_Service_Requests.Requests.length,
            this.PAGINATION_SIZE,
            page,
            baseUrl
        );

        const filteredRequests: ApgEdr_IRequest[] = [];
        filteredRequests
            .push(...ApgEdr_Service_Requests.Requests.slice(pagination.from - 1, pagination.to - 1));
        filteredRequests
            .sort((a, b) => a.counter - b.counter);

        const templateData = ApgEdr_Service_Core.GetTemplateData(
            edr,
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        const topMenu = this.getTranslatedLinks(NavBar, edr.language);

        templateData.page.data = {
            topMenu,
            pag: pagination,
            entryRoute: ApgEdr_Route_eShared.DEV_PAGE_REQUEST,
            requests: filteredRequests
        }

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }



    private getPagination(
        aitems: number,
        apageSize: number,
        apage: number,
        baseUrl: string
    ) {

        const pagination: Tng.ApgTng_IPagination = {
            pages: 1,
            page: apage,
            from: 1,
            to: apageSize,
            items: aitems,
            next: "",
            prev: "",
            first: "",
            last: "",
        };

        pagination.pages = Math.ceil(pagination.items / apageSize);


        if (pagination.pages == 1) {
            pagination.page = 1;
            pagination.to = pagination.items;

        }
        else {

            if (pagination.page > pagination.pages) {
                pagination.page = pagination.pages;
            }

            const startIndex = (pagination.page - 1) * apageSize;
            let endIndex = startIndex + apageSize;
            if (endIndex > pagination.items - 1) {
                endIndex = pagination.items - 1;
            }

            pagination.from = startIndex + 1;
            pagination.to = endIndex;

            if (pagination.page != 1) {
                pagination.first = `${baseUrl}1`;
            }
            if (pagination.page > 1) {
                pagination.prev = `${baseUrl}${pagination.page - 1}`;
            }
            if (pagination.page < pagination.pages) {
                pagination.next = `${baseUrl}${pagination.page + 1}`;
            }
            if (pagination.page != pagination.pages) {
                pagination.last = `${baseUrl}${pagination.pages}`;
            }
        }

        return pagination;
    }
}
