/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * ----------------------------------------------------------------------------
 */

import {
    Drash, Tng,
    Uts
} from "../deps.ts";
import {
    BrdEdr_Auth_eRole
} from "../enums/BrdEdr_Auth_eRole.ts";
import {
    BrdEdr_IRequest
} from "../interfaces/BrdEdr_IRequest.ts";
import {
    BrdEdr_IRequestError
} from "../interfaces/BrdEdr_IRequestError.ts";
import {
    BrdEdr_Auth_TAuthorization
} from "../types/BrdEdr_Auth_Types.ts";
import {
    BrdEdr_Log_Service
} from "./BrdEdr_Log_Service.ts";


/**
 * Servizio che contiene le regole di base per il funzionamento di un server Edr
 */
export class BrdEdr_Service {

    /**Cache of the errors occurred during the management of the requests.
     * It is used to render the error page
     */
    static Errors: BrdEdr_IRequestError[] = [];

    /** Html response header for client's cache persistency of served assets
     * In seconds */
    static ClientCacheMaxAge = 0;

    /** Local path to assets served by an Edr server*/
    static AssetsPath = "./srv";

    /** Local path to templates used by the template engine */
    static LocalTemplatesPath = "./srv/templates";


    /** The module is self hosted so not consider the remote templates path.
     * The default is false because usually the server is not self hosted due to
     * the fact that we import it in other microservices
    */
    static isSelfHosted = false;



    static Authorizations: BrdEdr_Auth_TAuthorization = {};


    static get IsDenoDeploy() {
        return Deno.env.get("DENO_DEPLOYMENT_ID") !== undefined;
    }


    /**
     * Get the edr data injected in the Drash request
     * by the middlewares
     */
    static GetEdrRequest(request: Drash.Request) {

        if ((request as any).edr) {
            const edr = (request as any).edr as BrdEdr_IRequest;
            return edr;
        }
        else {
            throw new Error('The [.edr] was not injected in the request. Call the BrdEdr_Middleware_Any.beforeResource first');
        }
    }


    /**
     * Renderizza una pagina html usando il BrdTng template engine
     * Il file del template deve essere specificato nel campo 
     * [apageData.page.template].
     * 
     * Il percorso del file del template può essere locale relativo al percorso
     * definito nel campo [LocalTemplatesPath], oppure può essere remoto e
     * relativo al campo [RemoteTemplatesPath]. Per forzare l'uso del template
     * remoto quando non si tratta del server self hosted utilizzare il flag 
     * [auseRemoteTemplateWhenNotSelfHosted]
     * 
     * @param request Drash request
     * @param response Drash response
     * @param apageData dati per l'interpolazione del template
     * @param aoptions opzioni per l'utilizzo di un host remoto
     */
    static async RenderPageUsingBrdTng(
        request: Drash.Request,
        response: Drash.Response,
        apageData: Tng.BrdTng_IPageData,
        aoptions: {
            auseRemoteTemplateWhenNotSelfHosted?: boolean;
            remoteHost: string
        } = {
                auseRemoteTemplateWhenNotSelfHosted: false,
                remoteHost: "https://apg-brd-edr.deno.dev/templates"
            }
    ) {
        const edr = this.GetEdrRequest(request);

        const events: Uts.BrdUts_ILogEvent[] = [];

        if (!this.isSelfHosted && aoptions.auseRemoteTemplateWhenNotSelfHosted) {
            apageData.page.template = `${aoptions.remoteHost}${apageData.page.template}`
        }

        const html = await Tng.BrdTng_Service.Render(
            apageData,
            events
        );

        response.html(html);

        BrdEdr_Log_Service.LogEvents(edr, events);
    }



    static VerifyProtectedPage(
        edr: BrdEdr_IRequest,
        arole: BrdEdr_Auth_eRole
    ) {


        let r = false;
        if (edr.auth) {
            if ((edr.auth.role === BrdEdr_Auth_eRole.ADMIN) ||
                (edr.auth.role === arole)) {
                r = true;
            }
        }

        return r;
    }



    static ServerStartupResume(
        amicroservice: Uts.BrdUts_IMicroservice,
        aaddress: string
    ) {
        const start = new Date();
        console.log('');
        console.log('');
        console.log(`********************************************************************`)
        console.log('');
        console.log(amicroservice.name);
        console.log(amicroservice.description);
        console.log('');
        console.log(`Server started at ${start.toLocaleString()}`);
        console.log(`Running at ${aaddress}.`);
        console.log('');
        console.log(`********************************************************************`)
        console.log('');
        console.log('');
    }
}