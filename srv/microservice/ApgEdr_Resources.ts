/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 1.0 APG 20240813 Cleanup
 * @version 1.1 APG 20240912 Test guest
 * ----------------------------------------------------------------------------
 */



import {Edr} from "../deps.ts";
import {ApgEdr_TngResource_About} from "../resources/ApgEdr_TngResource_About.ts";
import {ApgEdr_TngResource_Home} from "../resources/ApgEdr_TngResource_Home.ts";





export const ApgEdr_Resources: typeof Edr.Drash.Resource[] = [

    Edr.ApgEdr_FileResource_AnyAsset,
    Edr.ApgEdr_FileResource_AnyTemplate,

    ApgEdr_TngResource_Home,
    ApgEdr_TngResource_About,
    Edr.ApgEdr_TngResource_Support,
    Edr.ApgEdr_TngResource_Menu_User,
    Edr.ApgEdr_TngResource_Menu_Dev,
    Edr.ApgEdr_TngResource_Menu_Auth_Test,
    Edr.ApgEdr_TngResource_Menu_Api_Test,
    Edr.ApgEdr_TngResource_Menu_Dev_Tng,
    Edr.ApgEdr_TngResource_Menu_Admin,

    Edr.ApgEdr_Admin_TngResource_AuthTest,
    Edr.ApgEdr_Dev_TngResource_AuthTest,
    Edr.ApgEdr_User_TngResource_AuthTest,
    Edr.ApgEdr_Guest_TngResource_AuthTest,

    Edr.ApgEdr_Dev_TngResource_Tools,

    Edr.ApgEdr_TngResource_Language,
    Edr.ApgEdr_TngResource_RequestOtp,
    Edr.ApgEdr_TngResource_Login,
    Edr.ApgEdr_TngResource_Error,

    Edr.ApgEdr_Auth_TngResource_Logout,

    Edr.ApgEdr_Dev_TngResource_Requests,
    Edr.ApgEdr_Dev_TngResource_Request,
    Edr.ApgEdr_Dev_TngResource_Errors,
    Edr.ApgEdr_Dev_TngResource_Environment,

    Edr.ApgEdr_Dev_TngResource_Tng_Caches,
    Edr.ApgEdr_Dev_TngResource_Tng_File,
    Edr.ApgEdr_Dev_TngResource_Tng_Function,
    Edr.ApgEdr_Dev_TngResource_Tng_Chunk,
    Edr.ApgEdr_Dev_TngResource_Tng_Templates,

    Edr.ApgEdr_Admin_TngResource_User,
    Edr.ApgEdr_Admin_TngResource_User_Unlock,
    Edr.ApgEdr_Admin_TngResource_Users,

    Edr.ApgEdr_Admin_TngResource_Telemetry_Purge,

    Edr.ApgEdr_Dev_TngResource_Stories,
    Edr.ApgEdr_Dev_TngResource_Story,

    Edr.ApgEdr_Dev_TngResource_Status,

    Edr.ApgEdr_Dev_TngResource_TDD_Suites,
    Edr.ApgEdr_Dev_TngResource_TDD_Suite,
    Edr.ApgEdr_Dev_TngResource_TDD_Exec,

    Edr.ApgEdr_RestApiResource_Test,
];













