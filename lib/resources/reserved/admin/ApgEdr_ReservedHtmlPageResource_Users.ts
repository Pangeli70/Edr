/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240813
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
import { ApgEdr_Auth_IProfile } from "../../../interfaces/ApgEdr_Auth_IProfile.ts";
import { ApgEdr_Auth_Service } from "../../../services/ApgEdr_Auth_Service.ts";
import {
    ApgEdr_Service
} from "../../../services/ApgEdr_Service.ts";





export class ApgEdr_ReservedHtmlPageResource_Users extends Drash.Resource {

    override paths = [ApgEdr_Route_eShared.RESERVED_PAGE_USERS];

    readonly EDR_ROLE = ApgEdr_Auth_eRole.ADMIN;

    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdrRequest(request);
        if (!ApgEdr_Service.VerifyProtectedPage(edr, this.EDR_ROLE)) {
            this.redirect(ApgEdr_Route_eShared.PAGE_LOGIN, response);
            return;
        }

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            'Users',
            "/pages/reserved/admin/ApgEdr_ReservedHtmlPageTemplate_Users_01.html",
        )

        const profiles: ApgEdr_Auth_IProfile[] = [];
        for (const profile in ApgEdr_Auth_Service.Profilations) {
            profiles.push(ApgEdr_Auth_Service.Profilations[profile])
        }

        templateData.page.data = {
            userRoute: ApgEdr_Route_eShared.RESERVED_PAGE_USER,
            profiles
        }

        await ApgEdr_Service.RenderPageUsingTng(
            request,
            response,
            templateData,
            {
                isCdnResource: true
            }
        );
    }


}
