/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 0.4 APG 20240728 English comments
 * @version 0.5 APG 20240814 Renaming and filterlinks
 * ----------------------------------------------------------------------------
 */


import {
    Drash, Tng, Uts
} from "../deps.ts";
import {
    ApgEdr_Auth_eRole
} from "../enums/ApgEdr_Auth_eRole.ts";
import {
    ApgEdr_eCookie
} from "../enums/ApgEdr_eCookie.ts";
import {
    ApgEdr_IRequest
} from "../interfaces/ApgEdr_IRequest.ts";
import {
    ApgEdr_IRequestError
} from "../interfaces/ApgEdr_IRequestError.ts";
import {
    ApgEdr_Log_Service
} from "./ApgEdr_Log_Service.ts";


/**
 * Service for the shared data and features of the Edr microservice
 */
export class ApgEdr_Service {

    /** 
     * Cache of the errors occurred during the management of the requests.
     * It is used to render the error page
     */
    static Errors: ApgEdr_IRequestError[] = [];

    /** 
     * Cache of the requests made by the clients 
     * It is used for the logging and telemetry
     */
    static Requests: ApgEdr_IRequest[] = [];

    /** 
     * Html response header for client's cache persistency of served assets
     * In seconds
     */
    static ClientCacheMaxAge = 0;

    /**
     * Local path to assets served by this microservice
     */
    static LocalAssetsPath = "./srv/assets";

    /**
     * Local path to templates used by the template engine
     */
    static LocalTemplatesPath = "./srv/templates";

    /**
     * CDN server for assets and templates
     */
    static CdnHost = "https://apg-01.b-cdn.net";

    /**
     * Default Master
     */
    static DefaultMaster = "/master/ApgEdr_MasterPage_Application_V01.html";

    /**
     * Default custom Css 
     */
    static DefaultCustomCss = "ApgEdr_Pico_Custom_V01";

    /**
     * Default favicon 
     */
    static DefaultFavicon = "ApgEdr_Favicon_Apg_2024_V01";

    /**
     * Default Logo Js 
     */
    static DefaultLogoJs = "ApgEdr_Logo3D_Apg_2024_V01";

    /**
     * Remote CDN path to templates of ApgEdr shared resources
     */
    static CdnTemplatesPath = "/assets/html/templates";


    /**
     * Microservice definition
     */
    static Microservice: Uts.ApgUts_IMicroservice;


    /**
     * Use the Cdn set in CdnHost property for assets and templates
     * 
     * If false the Edr module is self hosted so it will not consider the remote templates path.
     * The default is true because usually the module is not self hosted due to
     * the fact that we import Edr in other microservices and we want to use remote
     * assets and templates served by a CDN
    */
    static UseCdn = true;



    static GetAssetsHost() {
        return this.UseCdn ? this.CdnHost : "";
    }


    static GetUserData(aedr: ApgEdr_IRequest) {
        return {
            email: aedr.auth?.email || "",
            role: aedr.auth?.role || ApgEdr_Auth_eRole.GUEST
        };
    }



    /**
     * Get the edr data injected in the Drash request
     * by the middlewares
     */
    static GetEdrRequest(request: Drash.Request) {

        // deno-lint-ignore no-explicit-any
        if ((request as any).edr) {
            // deno-lint-ignore no-explicit-any
            const edr = (request as any).edr as ApgEdr_IRequest;
            return edr;
        }
        else {
            throw new Error('The [.edr] was not injected in the request. Call the ApgEdr_Middleware_Any.beforeResource first');
        }
    }



    /**
     * Get the language for the page from the Drash request
     */
    static GetLanguage(request: Drash.Request) {

        let r = "EN"

        const headers = request.headers;
        if (headers.has("Accept-Language")) {
            const clientLang = headers.get("Accept-Language")
            if (clientLang) {
                r = clientLang.split(",")[1].toUpperCase()
            }
        }

        const cookie = request.getCookie(ApgEdr_eCookie.LANGUAGE);
        if (cookie) {
            r = cookie;
        }


        const qs = request.queryParam('Lang')
        if (qs) {
            r = qs;
        }

        if (["EN", "FR", "DE", "ES", "IT"].indexOf(r) === -1) {
            r = "EN"
        }

        return <Uts.ApgUts_TLanguage>r;
    }



    /**
     * Get the session id for the passed request
     */
    static GetSessionId(arequest: ApgEdr_IRequest) {

        const dts = new Uts.ApgUts_DateTimeStamp(new Date());

        return arequest.remoteAddr.hostname + "_" + dts.Stamp;
    }


    /**
     * Get the template data used by the Tng module
     */
    static GetTemplateData(
        edr: ApgEdr_IRequest,
        atitle: string,
        atemplate: string,
    ): Tng.ApgTng_IPageData {

        return {

            microservice: this.Microservice,

            page: {
                assetsHost: this.GetAssetsHost(),
                master: this.DefaultMaster,
                customCss: this.DefaultCustomCss,
                favicon: this.DefaultFavicon,
                logoJs: this.DefaultLogoJs,
                template: atemplate,
                title: atitle,
                lang: edr.language,
                rendered: new Date().toLocaleString(),
                data: {},
                translations: {}
            },

            user: this.GetUserData(edr),

            cache: {
                useIt: true
            }
        };
    }




    /**
     * Renders an HTML page using  the Tng module
     * The template file must be provided in the property
     * [apageData.page.template].
     * 
     * The path to the template file could be local referring to the property 
     * [LocalTemplatesPath], or it can be remote referring to the propery 
     * [RemoteTemplatesPath].
     * 
     * To force the use of the remote template when the microservice is not self 
     * hosted use the flag in the property [IsSelfHosted]
     * 
     * @param request Drash request
     * @param response Drash response
     * @param apageData data to be used in the interpolation of the template
     * @param aoptions options for the use of the remote templates
     */
    static async RenderPageUsingTng(
        request: Drash.Request,
        response: Drash.Response,
        apageData: Tng.ApgTng_IPageData,
        aoptions = {
            isCdnTemplate: false,
        }
    ) {
        const edr = this.GetEdrRequest(request);

        const events: Uts.ApgUts_ILogEvent[] = [];

        if (this.UseCdn) { 
            const cdnPath = `${this.CdnHost}${this.CdnTemplatesPath}`;
            apageData.page.master = `${cdnPath}${apageData.page.master}`
            if (aoptions.isCdnTemplate) {
                apageData.page.template = `${cdnPath}${apageData.page.template}`
            }
        }

        const html = await Tng.ApgTng_Service.Render(
            apageData,
            events
        );

        response.html(html);

        ApgEdr_Log_Service.LogEvents(edr, events);
    }



    static VerifyProtectedPage(
        edr: ApgEdr_IRequest,
        arole: ApgEdr_Auth_eRole
    ) {


        let r = false;
        if (edr.auth) {
            if ((edr.auth.role === ApgEdr_Auth_eRole.ADMIN) ||
                (edr.auth.role === arole)) {
                r = true;
            }
        }

        return r;
    }



    static FilterLinksByLogin(
        alinks: Tng.ApgTng_IHyperlink[],
        isLoggedIn: boolean
    ) {
        return alinks.filter(a => {

            let r = true;
            if (a.isReserved) {
                r = isLoggedIn;
            }
            else {
                if (a.isGuestOnly) {
                    r = !isLoggedIn;
                }
            }
            return r;
        });
    }



    static Store(arequest: ApgEdr_IRequest) {

        ApgEdr_Log_Service.LogInfo(
            arequest,
            import.meta.url,
            this.Store,
            'Total stored calls: ' + this.Requests.length
        );

        this.Requests.push(arequest);

    }



    static Error(
        amodule: string,
        // deno-lint-ignore ban-types
        amethod: Function,
        aedr: ApgEdr_IRequest,
        amessage: string,
        aredirectToUrl: string
    ) {

        this.Errors.push({
            counter: aedr.counter,
            message: amessage,
            redirectUrl: aredirectToUrl
        });

        ApgEdr_Log_Service.LogError(
            aedr,
            amodule,
            amethod,
            amessage
        );


    }



    static StartupResume(
        amicroservice: Uts.ApgUts_IMicroservice,
        aaddress: string
    ) {
        const start = new Date();
        console.log('');
        console.log('');
        console.log(`********************************************************************`)
        console.log('');
        console.log(amicroservice.name);
        console.log(amicroservice.title);
        console.log('');
        console.log(`Server started at ${start.toLocaleString()}`);
        console.log(`Running at ${aaddress}.`);
        console.log('');
        console.log(`********************************************************************`)
        console.log('');
        console.log('');
    }
}