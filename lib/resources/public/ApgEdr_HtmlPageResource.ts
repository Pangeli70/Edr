/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241006
 * ----------------------------------------------------------------------------
*/


import {
    Drash,
    Uts
} from "../../deps.ts";
import {
    ApgEdr_Route_eShared
} from "../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_IRequest
} from "../../interfaces/ApgEdr_IRequest.ts";

import {
    ApgEdr_Log_Service
} from "../../services/ApgEdr_Log_Service.ts";
import {
    ApgEdr_Service
} from "../../services/ApgEdr_Service.ts";





export abstract class ApgEdr_HtmlPageResource extends Drash.Resource {


    abstract readonly RESOURCE_NAME: string;


    protected loggedRedirect(
        amethod: Function,
        aresponse: Drash.Response,
        aedr: ApgEdr_IRequest,
        afromUrl: string,
        atoUrl: string
    ) {
        ApgEdr_Log_Service.Log(
            aedr,
            Uts.ApgUts_eEventType.REDIR,
            this.RESOURCE_NAME,
            amethod,
            'Redirecting to ' + atoUrl
        )

        if (!aedr.redirectedFrom) {
            aedr.redirectedFrom = [];
        }

        aedr.redirectedFrom.push(afromUrl);

      //  ApgEdr_Service.StoreEdr(aedr);

        this.redirect(atoUrl, aresponse);
    }



    protected loggedRedirectToError(
        amethod: Function,
        aresponse: Drash.Response,
        aedr: ApgEdr_IRequest,
        afromUrl: string,
    ) {
        const url = ApgEdr_Route_eShared.PAGE_ERROR + "/" + aedr.counter;
        this.loggedRedirect(amethod, aresponse, aedr, afromUrl, url);
    }


}
