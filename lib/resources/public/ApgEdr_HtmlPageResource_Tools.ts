/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240701 Cleanup
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * ----------------------------------------------------------------------------
 */

import {
    Drash
} from "../../deps.ts";
import {
    ApgEdr_Route_eShared
} from "../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_Service
} from "../../services/ApgEdr_Service.ts";
import { ApgEdr_HtmlPageResource } from "./ApgEdr_HtmlPageResource.ts";


export const ApgEdr_Menu_Dev_Tng_Top = [
    {
        url: ApgEdr_Route_eShared.PAGE_HOME,
        label: {
            IT: "Menu principale",
            EN: "Main menu"
        },
        title: {
            IT: "Torna a pagina inziale",
            EN: "Back to home page"
        },
        isReserved: false
    },
    {
        url: ApgEdr_Route_eShared.PAGE_MENU_DEV,
        label: {
            IT: "Sviluppatore",
            EN: "Developer"
        },
        title: {
            IT: "Torna a menu funzioni sviluppatore",
            EN: "Back to developer features menu"
        },
        isReserved: false
    },

]


export class ApgEdr_HtmlPageResource_Tools
    extends ApgEdr_HtmlPageResource {

    override readonly RESOURCE_NAME = ApgEdr_HtmlPageResource_Tools.name
    override paths = [ApgEdr_Route_eShared.PAGE_DEV_TOOLS];

    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Development tools',
            "/pages/ApgEdr_HtmlPageTemplate_Tools_01.html",
        )

        const topMenu = this.getTranslatedLinks(ApgEdr_Menu_Dev_Tng_Top, edr.language);

        templateData.page.data = {
            topMenu
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
