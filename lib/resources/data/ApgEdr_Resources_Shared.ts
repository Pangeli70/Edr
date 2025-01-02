/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/08/13] Cleanup
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { Drash } from "../../deps.ts";
import { ApgEdr_Admin_TngResource_AuthTest } from "../admin/ApgEdr_Admin_TngResource_AuthTest.ts";
import { ApgEdr_Dev_TngResource_Telemetry_Purge } from "../dev/ApgEdr_Dev_TngResource_Telemetry_Purge.ts";
import { ApgEdr_Admin_TngResource_User } from "../admin/ApgEdr_Admin_TngResource_User.ts";
import { ApgEdr_Admin_TngResource_User_Unlock } from "../admin/ApgEdr_Admin_TngResource_User_Unlock.ts";
import { ApgEdr_Admin_TngResource_Users } from "../admin/ApgEdr_Admin_TngResource_Users.ts";
import { ApgEdr_Dev_TngResource_AuthTest } from "../dev/ApgEdr_Dev_TngResource_AuthTest.ts";
import { ApgEdr_Dev_TngResource_Environment } from "../dev/ApgEdr_Dev_TngResource_Environment.ts";
import { ApgEdr_Dev_TngResource_Errors } from "../dev/ApgEdr_Dev_TngResource_Errors.ts";
import { ApgEdr_Dev_TngResource_Request } from "../dev/ApgEdr_Dev_TngResource_Request.ts";
import { ApgEdr_Dev_TngResource_Requests } from "../dev/ApgEdr_Dev_TngResource_Requests.ts";
import { ApgEdr_Dev_TngResource_Status } from "../dev/ApgEdr_Dev_TngResource_Status.ts";
import { ApgEdr_Dev_TngResource_Stories } from "../dev/ApgEdr_Dev_TngResource_Stories.ts";
import { ApgEdr_Dev_TngResource_Story } from "../dev/ApgEdr_Dev_TngResource_Story.ts";
import { ApgEdr_Dev_TngResource_TDD_Exec } from "../dev/ApgEdr_Dev_TngResource_TDD_Exec.ts";
import { ApgEdr_Dev_TngResource_TDD_Suite } from "../dev/ApgEdr_Dev_TngResource_TDD_Suite.ts";
import { ApgEdr_Dev_TngResource_TDD_Suites } from "../dev/ApgEdr_Dev_TngResource_TDD_Suites.ts";
import { ApgEdr_Dev_TngResource_Tng_Caches } from "../dev/ApgEdr_Dev_TngResource_Tng_Caches.ts";
import { ApgEdr_Dev_TngResource_Tng_Chunk } from "../dev/ApgEdr_Dev_TngResource_Tng_Chunk.ts";
import { ApgEdr_Dev_TngResource_Tng_File } from "../dev/ApgEdr_Dev_TngResource_Tng_File.ts";
import { ApgEdr_Dev_TngResource_Tng_Function } from "../dev/ApgEdr_Dev_TngResource_Tng_Function.ts";
import { ApgEdr_Dev_TngResource_Tng_Templates } from "../dev/ApgEdr_Dev_TngResource_Tng_Templates.ts";
import { ApgEdr_Dev_TngResource_Tools } from "../dev/ApgEdr_Dev_TngResource_Tools.ts";
import { ApgEdr_Guest_TngResource_AuthTest } from "../guest/ApgEdr_Guest_TngResource_AuthTest.ts";
import { ApgEdr_FileResource_AnyAsset } from "../public/ApgEdr_FileResource_AnyAsset.ts";
import { ApgEdr_FileResource_AnyTemplate } from "../public/ApgEdr_FileResource_AnyTemplate.ts";
import { ApgEdr_RestApiResource_Test } from "../public/ApgEdr_RestResource_ApiTest.ts";
import { ApgEdr_TngResource_Error } from "../public/ApgEdr_TngResource_Error.ts";
import { ApgEdr_TngResource_Language } from "../public/ApgEdr_TngResource_Language.ts";
import { ApgEdr_TngResource_Login } from "../public/ApgEdr_TngResource_Login.ts";
import { ApgEdr_TngResource_Menu_Admin } from "../public/ApgEdr_TngResource_Menu_Admin.ts";
import { ApgEdr_TngResource_Menu_Api_Test } from "../public/ApgEdr_TngResource_Menu_Api_Test.ts";
import { ApgEdr_TngResource_Menu_Auth_Test } from "../public/ApgEdr_TngResource_Menu_Auth_Test.ts";
import { ApgEdr_TngResource_Menu_Dev } from "../public/ApgEdr_TngResource_Menu_Dev.ts";
import { ApgEdr_TngResource_Menu_Dev_Tng } from "../public/ApgEdr_TngResource_Menu_Dev_Tng.ts";
import { ApgEdr_TngResource_Menu_User } from "../public/ApgEdr_TngResource_Menu_User.ts";
import { ApgEdr_TngResource_RequestOtp } from "../public/ApgEdr_TngResource_RequestOtp.ts";
import { ApgEdr_TngResource_Support } from "../public/ApgEdr_TngResource_Support.ts";
import { ApgEdr_TngResource_Logout } from "../public/ApgEdr_TngResource_Logout.ts";
import { ApgEdr_User_TngResource_AuthTest } from "../user/ApgEdr_User_TngResource_AuthTest.ts";




export const ApgEdr_Resources_Shared: typeof Drash.Resource[] = [

    ApgEdr_FileResource_AnyAsset,
    ApgEdr_FileResource_AnyTemplate,

    ApgEdr_TngResource_Support,
    ApgEdr_TngResource_Menu_User,
    ApgEdr_TngResource_Menu_Dev,
    ApgEdr_TngResource_Menu_Auth_Test,
    ApgEdr_TngResource_Menu_Api_Test,
    ApgEdr_TngResource_Menu_Dev_Tng,
    ApgEdr_TngResource_Menu_Admin,

    ApgEdr_Admin_TngResource_AuthTest,
    ApgEdr_Dev_TngResource_AuthTest,
    ApgEdr_User_TngResource_AuthTest,
    ApgEdr_Guest_TngResource_AuthTest,

    ApgEdr_Dev_TngResource_Tools,

    ApgEdr_TngResource_Language,
    ApgEdr_TngResource_RequestOtp,
    ApgEdr_TngResource_Login,
    ApgEdr_TngResource_Error,

    ApgEdr_TngResource_Logout,

    ApgEdr_Dev_TngResource_Requests,
    ApgEdr_Dev_TngResource_Request,
    ApgEdr_Dev_TngResource_Errors,
    ApgEdr_Dev_TngResource_Environment,

    ApgEdr_Dev_TngResource_Tng_Caches,
    ApgEdr_Dev_TngResource_Tng_File,
    ApgEdr_Dev_TngResource_Tng_Function,
    ApgEdr_Dev_TngResource_Tng_Chunk,
    ApgEdr_Dev_TngResource_Tng_Templates,

    ApgEdr_Admin_TngResource_User,
    ApgEdr_Admin_TngResource_User_Unlock,
    ApgEdr_Admin_TngResource_Users,

    ApgEdr_Dev_TngResource_Telemetry_Purge,

    ApgEdr_Dev_TngResource_Stories,
    ApgEdr_Dev_TngResource_Story,

    ApgEdr_Dev_TngResource_Status,

    ApgEdr_Dev_TngResource_TDD_Suites,
    ApgEdr_Dev_TngResource_TDD_Suite,
    ApgEdr_Dev_TngResource_TDD_Exec,

    ApgEdr_RestApiResource_Test,
];













