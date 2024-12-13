/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240708
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * @version 1.3 APG 20240902 Better permissions management
 * @version 1.4 APG 20241007 Pagination
 * ----------------------------------------------------------------------------
*/


import { Drash, Tng, Uts } from "../../../deps.ts";
import { ApgEdr_Auth_eRole } from "../../../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_Route_eShared } from "../../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_IRequest } from "../../../interfaces/ApgEdr_IRequest.ts";
import { ApgEdr_Log_Service } from "../../../services/ApgEdr_Log_Service.ts";
import { ApgEdr_Service } from "../../../services/ApgEdr_Service.ts";
import { ApgEdr_Auth_TngResource } from "../ApgEdr_Auth_TngResource.ts";


export class ApgEdr_Auth_TngResource_Log_List

    extends ApgEdr_Auth_TngResource {


    override readonly RESOURCE_NAME = ApgEdr_Auth_TngResource_Log_List.name;
    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Log of the events",
    }
    override readonly EDR_ROLE = ApgEdr_Auth_eRole.DEV;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Log_List_01.html"
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_LOG];

    readonly QS_PARAM_PAGINATION = 'page';
    readonly PAGINATION_SIZE = 20;



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);
        if (!this.verifyPermissions(edr, this.GET.name, request, response)) return;

        const rawPage = request.queryParam(this.QS_PARAM_PAGINATION);

        let page = 1;
        if (rawPage) {
            if (Uts.ApgUts_Is.IsInteger(rawPage)) {
                page = parseInt(rawPage);
            }
        }

        const baseUrl = `${ApgEdr_Route_eShared.RESERVED_PAGE_LOG}?${this.QS_PARAM_PAGINATION}=`

        const pagination: Tng.ApgTng_IPagination = this.getPagination(
            ApgEdr_Log_Service.Requests.length,
            this.PAGINATION_SIZE,
            page,
            baseUrl
        );

        const filteredRequests: ApgEdr_IRequest[] = [];
        filteredRequests
            .push(...ApgEdr_Log_Service.Requests.slice(pagination.from - 1, pagination.to - 1));
        filteredRequests
            .sort((a, b) => a.counter - b.counter);

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            Uts.ApgUts_Translator.Translate(this.TITLE, edr.language),
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        templateData.page.data = {
            pag: pagination,
            entryRoute: ApgEdr_Route_eShared.RESERVED_PAGE_LOG_ENTRY,
            requests: filteredRequests
        }

        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
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
