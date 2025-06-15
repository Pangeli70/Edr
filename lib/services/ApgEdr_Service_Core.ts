/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/09] Alpha version
 * @version 0.9.2 [APG 2023/04/16] Moved to its own microservice
 * @version 0.9.3 [APG 2024/01/06] Revamped
 * @version 0.9.4 [APG 2024/07/28] English comments
 * @version 0.9.5 [APG 2024/08/14] Renaming and filterlinks
 * @version 0.9.6 [APG 2024/10/08] Max Asset Size
 * @version 0.9.7 [APG 2024/10/17] Extends ApgUts_Service
 * @version 0.9.8 [APG 2024/11/08] Extracted log service
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Edr } from "../../mod.ts";
import { ApgEdr_Request } from "../classes/ApgEdr_Request.ts";
import { Drash, Tng, Uts } from "../deps.ts";
import { ApgEdr_Auth_eResult } from "../enums/ApgEdr_Auth_eResult.ts";
import { ApgEdr_Auth_eRole } from "../enums/ApgEdr_Auth_eRole.ts";
import { ApgEdr_eCookieId } from "../enums/ApgEdr_eCookieId.ts";
import { ApgEdr_eRoute } from "../enums/ApgEdr_eRoute.ts";
import { ApgEdr_IRequest } from "../interfaces/ApgEdr_IRequest.ts";


/**
 * Service for the shared data and features of the Edr microservice
 */
export class ApgEdr_Service_Core

    extends Uts.ApgUts_Service {


    protected static override InitServiceName() {
        return ApgEdr_Service_Core.name;
    }

    /**
     * Defines the expiration of the cookie that contains the telemetry id
     * This is basically the session expiration after the user interrupts 
     * interaction with the microservice.
     * In seconds. 
     */
    static readonly MAX_TELEMETRY_TIME_SPAN = 60 * 60;  // 1 hours in seconds

    /** 
     * Cache of the requests processed with errors.
     * It is used to fast track the errors
     */
    static Errors: ApgEdr_IRequest[] = [];



    /** 
     * Client's cache persistency of served assets set in the Html response header
     * In seconds. It is used to limit the amount of times the asset is requested.
     */
    static ServedAssets_ClientCache_MaxAge = 10 * 60; // 10 minutes

    /**
     * The maximum size in MB of the assets served by this microservice
     * If the size is exceeded the request could be rejected. 
     * Meaning that that asset would be better served by a CDN.
     */
    static MaxAssetSize = 8; //@0.6

    /**
     * Local path to assets served by this microservice
     */
    static LocalAssetsPath = "./srv/assets";

    /**
     * Local path to templates used by the template engine
     */
    static LocalTemplatesPath = "./srv/templates";

    /**
     * Remote CDN path to templates of ApgEdr shared resources
     */
    static CdnTemplatesPath = "/edr/templates";

    /**
     * CDN server for assets and templates. Defaults to BunnyCdn
     */
    static CdnHost = "https://apg-01.b-cdn.net";

    /**
     * Default Tng Master
     */
    static DefaultTngMaster = "/master/ApgEdr_MasterPage_Application_V01.html";

    /**
     * Default value master page template coming from cdn
     */
    static DefaultIsCdnMaster = true;

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
     * Support team email address. It is initialized with a placeholder. Load this from env!
     */
    static SupportEmail = "support@apg-web-dev-24.it";

    /**
     * Microservice definition
     */
    static Microservice: Uts.ApgUts_IMicroservice;


    /**
     * Use the CdnHost as root path for resources like templates and assets
     * 
     * If false the Edr module is self hosted so it will not consider the remote templates path.
     * The default is true because usually the module is not self hosted due to
     * the fact that we import Edr in other microservices and we want to use remote
     * assets and templates served by a CDN
    */
    static UseCdnHost = true;



    static GetAssetsHost() {
        return this.UseCdnHost ? this.CdnHost : "";
    }

    static GetMasterHost() {
        return this.UseCdnHost ? this.CdnHost : "";
    }

    static GetTemplatesHost() {
        return this.UseCdnHost ? this.CdnHost : "";
    }



    static GetUserData(aedr: ApgEdr_IRequest) {
        return {
            email: aedr.auth?.email || "",
            role: aedr.auth?.role || ApgEdr_Auth_eRole.ANONYMOUS
        };
    }



    /**
     * Get the edr data injected in the Drash request
     * by the middlewares
     */
    static GetEdr(request: Drash.Request) {

        // deno-lint-ignore no-explicit-any
        if ((request as any).edr) {
            // deno-lint-ignore no-explicit-any
            const edr = (request as any).edr as ApgEdr_Request;
            return edr;
        }
        else {
            throw new Error('The [.edr] property was not injected in the request. Call the ApgEdr_Middleware_Any.beforeResource first');
        }
    }



    /**
     * Get the telemetry id for the response from the cookie of the Drash request
     * Or instead create a new one
     */
    static GetTelemetryId(request: Drash.Request) {

        let r = request.getCookie(ApgEdr_eCookieId.TELEMETRY_ID);

        if (!r) {
            r = new Uts.ApgUts_DateTimeStamp().Stamp;
        }

        return r;
    }



    /**
     * Get the language for the response from the Drash request
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

        const cookie = request.getCookie(ApgEdr_eCookieId.LANGUAGE);
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

        return arequest.client.hostname + "_" + dts.Stamp;
    }



    /**
     * Get the template data used by the Tng module
     */
    static GetTngData(
        edr: ApgEdr_IRequest,
        aresource: Edr.ApgEdr_TngResource_Base,
        atemplate: "GET" | "POST"
    ): Tng.ApgTng_IPageData {

        const amaster = (aresource.TNG_MASTER == "") ? this.DefaultTngMaster : aresource.TNG_MASTER;
        const aisCdnMaster = aresource.IS_MASTER_FROM_CDN;

        const template = aresource.TNG_TEMPLATES[atemplate];
        Uts.ApgUts.PanicIf(!template, 'The template file for the [' + atemplate + '] route is not defined for resource [' + aresource.RESOURCE_NAME + ']');

        const aisCdnTemplate = aresource.ARE_TEMPLATES_FROM_CDN;

        return {

            microservice: this.Microservice,

            page: {

                assetsHost: this.GetAssetsHost(),

                masterHost: aisCdnMaster ? this.CdnHost : "",
                masterPath: aisCdnMaster ? this.CdnTemplatesPath : this.LocalTemplatesPath,
                master: amaster,
                isCdnMaster: aisCdnMaster,

                templateHost: aisCdnTemplate ? this.CdnHost : "",
                templatePath: aisCdnTemplate ? this.CdnTemplatesPath : this.LocalTemplatesPath,
                template: template!,
                isCdnTemplate: aisCdnTemplate,

                title: aresource.TITLE,
                lang: edr.language,

                customCss: this.DefaultCustomCss,
                favicon: this.DefaultFavicon,
                logoJs: this.DefaultLogoJs,

                data: {},
                translations: {},

                rendered: new Date().toLocaleString(),

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
     */
    static async RenderPageUsingTng(
        apageData: Tng.ApgTng_IPageData
    ) {

        return await Tng.ApgTng_Service.Render(apageData);

    }








    static VerifyProtectedPage(
        aedr: ApgEdr_IRequest,
        aminRole: ApgEdr_Auth_eRole
    ) {

        if (aminRole === ApgEdr_Auth_eRole.ANONYMOUS) {
            return ApgEdr_Auth_eResult.OK;
        }

        if (aedr.auth) {

            if (aedr.auth.role === aminRole) {
                return ApgEdr_Auth_eResult.OK;
            }

            if (aedr.auth.role === ApgEdr_Auth_eRole.ADMIN) {
                return ApgEdr_Auth_eResult.OK;
            }

            if (
                (aedr.auth.role === ApgEdr_Auth_eRole.DEV) &&
                (aminRole === ApgEdr_Auth_eRole.USER || aminRole === ApgEdr_Auth_eRole.GUEST)
            ) {
                return ApgEdr_Auth_eResult.OK;
            }

            if (
                (aedr.auth.role === ApgEdr_Auth_eRole.USER) &&
                (aminRole === ApgEdr_Auth_eRole.GUEST)
            ) {
                return ApgEdr_Auth_eResult.OK;
            }

            return ApgEdr_Auth_eResult.INSUFF;

        }

        return ApgEdr_Auth_eResult.UNKNOWN;
    }



    static FilterLinksByRole(
        aedr: ApgEdr_IRequest,
        alinks: Tng.ApgTng_IHyperlink[]
    ) {

        const METHOD = this.Method(this.FilterLinksByRole);

        if (!alinks || alinks.length == 0) {
            return [];
        }

        let i = 0;
        return alinks.filter(link => {

            Uts.ApgUts.PanicIf(!link, METHOD + 'Undefined item [' + i.toString() + '] in links array');

            let r = true;
            if (link.isReserved) {
                if (link.role != undefined) {
                    const result = this.VerifyProtectedPage(aedr, link.role as ApgEdr_Auth_eRole);
                    r = (result === ApgEdr_Auth_eResult.OK);
                }
                else {
                    Uts.ApgUts.PanicIf(true, METHOD + 'Link is reserved but role is undefined');
                }
            }
            else {
                if (link.isAnonymousOnly) {
                    if (aedr.auth) {
                        r = aedr.auth.role === ApgEdr_Auth_eRole.ANONYMOUS;
                    }
                }
            }
            i++;
            return r;
        });
    }



    static PrepareMessageFromEdr(aedr: ApgEdr_IRequest) {

        if (!aedr.message) {
            aedr.message = {
                title: "Error",
                text: "Unknown error or message",
                next: ApgEdr_eRoute.PAGE_HOME
            };
        }

        const title = (typeof (aedr.message.title) == "string") ?
            aedr.message.title :
            Uts.ApgUts_Translator.Translate(aedr.message.title, aedr.language, aedr.message.params);

        const text = (typeof (aedr.message.text) == "string") ?
            aedr.message.text :
            Uts.ApgUts_Translator.Translate(aedr.message.text, aedr.language, aedr.message.params);

        const next = aedr.message.next;

        return { title, text, next };
    }



    static HandleError(
        aedr: ApgEdr_Request,
        aclassName: string,
        amethodName: string,
    ) {


        const { title, text } = this.PrepareMessageFromEdr(aedr);

        const message = `${title}: ${text}`;

        aedr.LogError(
            aclassName,
            amethodName,
            message
        );

        this.Errors.push(aedr);

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