/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20241006
 * @version 1.0 APG 20241107 Better logging
 * ----------------------------------------------------------------------------
*/


import {
    Drash,
    Uts,
    Tng
} from "../../deps.ts";
import {
    ApgEdr_Route_eShared
} from "../../enums/ApgEdr_Route_eShared.ts";
import {
    ApgEdr_Request
} from "../../classes/ApgEdr_Request.ts";






export abstract class ApgEdr_HtmlPageResource
    extends Drash.Resource {


    /**
     * Abstract properties Must be overridden by subclasses
     */
    abstract readonly RESOURCE_NAME: string;
    
    abstract readonly TNG_TEMPLATES: {
        GET?: string,
        POST?: string,
    };

    abstract readonly ARE_TEMPLATES_FROM_CDN: boolean;


    protected logAndRedirect(
        aedr: ApgEdr_Request,
        amethodName: string,
        afromUrl: string,
        atoUrl: string,
        aresponse: Drash.Response,
    ) {
        aedr.Log(
            Uts.ApgUts_eEventType.REDIR,
            this.RESOURCE_NAME,
            amethodName,
            'Redirecting to ' + atoUrl
        )

        if (!aedr.redirectedFrom) {
            aedr.redirectedFrom = [];
        }

        aedr.redirectedFrom.push(afromUrl);

        //  ApgEdr_Service.StoreEdr(aedr);

        this.redirect(atoUrl, aresponse);
    }



    protected logAndRedirectToErrorPage(
        aedr: ApgEdr_Request,
        amethodName: string,
        aresponse: Drash.Response,
        afromUrl: string,
    ) {
        const url = ApgEdr_Route_eShared.PAGE_ERROR + "/" + aedr.counter;
        this.logAndRedirect(aedr, amethodName, afromUrl, url, aresponse);
    }


    
    protected getTranslatedLinks(
        alinks: Tng.ApgTng_IHyperlink[],
        alang: Uts.ApgUts_TLanguage
    ) {

        const r: {
            url: string,
            label: string,
            title: string
        }[] = [];
        for (const link of alinks) {
            r.push({
                url: link.url,
                label: Uts.ApgUts_Translator.Translate(link.label, alang),
                title: (link.title) ? Uts.ApgUts_Translator.Translate(link.title, alang) : ""
            })
        }
        return r;
    }

}
