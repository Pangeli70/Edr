/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2022/09/09] Alpha version
 * @version 0.9.2 [APG 2023/04/16] Moved to its own microservice
 * @version 0.9.3 [APG 2024/01/06] Revamped
 * @version 1.0.0 [APG 2024/08/13] Cleanup
 * @version 1.0.1 [APG 2024/09/12] Test guest
 * @version 1.0.2 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */



import { Edr } from "../deps.ts";
import { ApgEdr_TngResource_About } from "../resources/ApgEdr_TngResource_About.ts";
import { ApgEdr_TngResource_Home } from "../resources/ApgEdr_TngResource_Home.ts";





export const ApgEdr_Resources: typeof Edr.Drash.Resource[] = [

    ...Edr.ApgEdr_Resources_Shared,

    ApgEdr_TngResource_Home,
    ApgEdr_TngResource_About,


];













