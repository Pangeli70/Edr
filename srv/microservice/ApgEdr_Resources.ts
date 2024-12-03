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
    Edr.ApgEdr_TngResource_Menu_Dev_Test,
    Edr.ApgEdr_TngResource_Menu_Dev_Tng,
    Edr.ApgEdr_TngResource_Menu_Admin,

    Edr.ApgEdr_Auth_TngResource_Admin_AuthTest,
    Edr.ApgEdr_Auth_TngResource_Dev_AuthTest,
    Edr.ApgEdr_Auth_TngResource_User_AuthTest,
    Edr.ApgEdr_Auth_TngResource_Guest_AuthTest,

    Edr.ApgEdr_Auth_TngResource_Dev_Tools,

    Edr.ApgEdr_TngResource_Language,
    Edr.ApgEdr_TngResource_RequestOtp,
    Edr.ApgEdr_TngResource_Login,
    Edr.ApgEdr_TngResource_Error,

    Edr.ApgEdr_Auth_TngResource_Logout,

    Edr.ApgEdr_Auth_TngResource_Log_List,
    Edr.ApgEdr_Auth_TngResource_Log_Entry,
    Edr.ApgEdr_Auth_TngResource_Log_Errors,
    Edr.ApgEdr_Auth_TngResource_Environment,

    Edr.ApgEdr_Auth_TngResource_Tng_Caches,
    Edr.ApgEdr_Auth_TngResource_Tng_File,
    Edr.ApgEdr_Auth_TngResource_Tng_Function,
    Edr.ApgEdr_Auth_TngResource_Tng_Chunk,
    Edr.ApgEdr_Auth_TngResource_Tng_Templates,

    Edr.ApgEdr_Auth_TngResource_User,
    Edr.ApgEdr_Auth_TngResource_User_Unlock,
    Edr.ApgEdr_Auth_TngResource_Users,

    Edr.ApgEdr_Auth_TngResource_Telemetry_Purge,

    Edr.ApgEdr_Auth_TngResource_Dev_Stories,
    Edr.ApgEdr_Auth_TngResource_Dev_Story,

    Edr.ApgEdr_Auth_TngResource_Status,

    Edr.ApgEdr_Auth_TngResource_Dev_TDD_Suites,
    Edr.ApgEdr_Auth_TngResource_Dev_TDD_Suite,
    Edr.ApgEdr_Auth_TngResource_Dev_TDD_Exec,

    Edr.ApgEdr_RestApiResource_Test,
];













