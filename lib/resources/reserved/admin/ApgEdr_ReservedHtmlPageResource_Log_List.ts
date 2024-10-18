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


import {
    Drash,
    Uts
} from "../../../deps.ts";
import {
    ApgEdr_Auth_eRole
} from "../../../enums/ApgEdr_Auth_eRole.ts";
import {
    ApgEdr_Route_eShared
} from "../../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_IRequest
} from "../../../interfaces/ApgEdr_IRequest.ts";
import {
    ApgEdr_Service
} from "../../../services/ApgEdr_Service.ts";
import {
    ApgEdr_ReservedHtmlPageResource
} from "../ApgEdr_ReservedHtmlPageResource.ts";


interface IPagination {
    pages: number,
    page: number,
    from: number,
    to: number,
    items: number,
    next: string,
    prev: string,
    first: string,
    last: string,
}


export class ApgEdr_ReservedHtmlPageResource_Log_List
    extends ApgEdr_ReservedHtmlPageResource {

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_LOG];

    readonly QS_PARAM_PAGINATION = 'page';
    readonly PAGINATION_SIZE = 20;

    override readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;
    override readonly RESOURCE_NAME = ApgEdr_ReservedHtmlPageResource_Log_List.name;

    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdrRequest(request);
        if (!this.verifyPermissions(this.GET, request, response, edr)) return;

        const rawPagination = request.queryParam(this.QS_PARAM_PAGINATION);

        const baseUrl = `${ApgEdr_Route_eShared.RESERVED_PAGE_LOG}?${this.QS_PARAM_PAGINATION}=`;


        const pagination: IPagination = {
            pages: 1,
            page: 1,
            from: 1,
            to: this.PAGINATION_SIZE,
            items: ApgEdr_Service.Requests.length,
            next: "",
            prev: "",
            first: "",
            last: "",
        }

        if (rawPagination) {
            if (Uts.ApgUts_Is.IsInteger(rawPagination)) {
                pagination.page = parseInt(rawPagination);
            }
        }

        const filteredRequests: ApgEdr_IRequest[] = [];

        pagination.pages = Math.ceil(pagination.items / this.PAGINATION_SIZE);



        if (pagination.pages == 1) {
            filteredRequests.push(...ApgEdr_Service.Requests);
            pagination.to = pagination.items;
        }
        else {

            let startIndex = 0;
            let endIndex = this.PAGINATION_SIZE;

            if (pagination.page > pagination.pages) {
                pagination.page = pagination.pages;
            }

            if (pagination.page != 1) {
                startIndex = (pagination.page - 1) * this.PAGINATION_SIZE;
                endIndex = startIndex + this.PAGINATION_SIZE;
                if (endIndex > pagination.items - 1) {
                    endIndex = pagination.items - 1;
                }
            }
            filteredRequests
                .push(...ApgEdr_Service.Requests.slice(startIndex, endIndex))
            filteredRequests
                .sort((a, b) => a.counter - b.counter);

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



        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Log',
            "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Log_List_01.html",
        )

        templateData.page.data = {
            pag: pagination,
            entryRoute: ApgEdr_Route_eShared.RESERVED_PAGE_LOG_ENTRY,
            requests: filteredRequests
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
