/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/07/08]
 * @version 1.0.1 [APG 2024/07/31] ApgEdr_Service.GetTemplateData
 * @version 1.0.2 [APG 2024/08/13] Moved to lib
 * @version 1.0.3 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Drash, Uts, } from "../../deps.ts";
import { ApgEdr_eRoute } from "../../enums/ApgEdr_eRoute.ts";
import { ApgEdr_IRequest } from "../../interfaces/ApgEdr_IRequest.ts";
import { ApgEdr_Service_Requests } from "../../services/ApgEdr_Service_Requests.ts";
import { ApgEdr_Service_Core } from "../../services/ApgEdr_Service_Core.ts";
import { ApgEdr_TngResource_Base } from "../ApgEdr_TngResource_Base.ts";



enum _etranslations {
    PAGE_TITLE = "PAGE_TITLE_GET_1",
}


const _Translator = new Uts.ApgUts_Translator(
    {
        [_etranslations.PAGE_TITLE]: {
            EN: "Error",
            IT: "Errore"
        },
    }
);



export class ApgEdr_TngResource_Error

    extends ApgEdr_TngResource_Base {


    override readonly RESOURCE_NAME = ApgEdr_TngResource_Error.name;
    override readonly TITLE = "Error";
    override readonly ARE_TEMPLATES_FROM_CDN = true;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/public/" + this.RESOURCE_NAME + ".html"
    };

    readonly PATH_PARAM_ERR_ID = 'counter';
    readonly QS_PARAM_FROM_ERRORS_LIST = 'FEL';

    override paths = [ApgEdr_eRoute.PAGE_ERROR + "/:" + this.PATH_PARAM_ERR_ID];



    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service_Core.GetEdr(request);

        const rawErrId = request.pathParam(this.PATH_PARAM_ERR_ID);

        const isFromErrorsList = request.queryParam(this.QS_PARAM_FROM_ERRORS_LIST) == '1';

        if (Uts.ApgUts_Is.IsInteger(rawErrId)) {
            const errId = parseInt(rawErrId!);
            const edrWithError = ApgEdr_Service_Requests.RetriveEdrByCallId(errId);
            if (edrWithError) {
                edr.message = edrWithError.message;
            }
        }

        const templateData = this.#getTemplateData(edr, isFromErrorsList);

        const { html, events } = await ApgEdr_Service_Core.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }


    #getTemplateData(
        aedr: ApgEdr_IRequest,
        aisFromErrorsList: boolean
    ) {

        const pageTitle = _Translator.get(_etranslations.PAGE_TITLE, aedr.language);

        if (!aedr.message) {
            aedr.message = {
                title: pageTitle,
                text: "The redirect to this error page does not have a message",
                next: ApgEdr_eRoute.PAGE_HOME
            }
            ApgEdr_Service_Core.Errors.push(aedr)
        }

        const { title, text, next } = ApgEdr_Service_Core.PrepareMessageFromEdr(aedr);

        const r = ApgEdr_Service_Core.GetTngData(aedr, this, 'GET');

        r.page.title = title;

        r.page.data = {
            message: text,
            okLink: aisFromErrorsList ? ApgEdr_eRoute.DEV_PAGE_ERRORS : next
        }

        return r;
    }


}
