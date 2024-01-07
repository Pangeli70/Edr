/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * ----------------------------------------------------------------------------
 */


import * as Edr from "../lib/mod.ts";
import {
    BrdEdr_Home_PageResource
} from "./resources/BrdEdr_Home_PageResource.ts";
import {
    BrdEdr_Test_RestResource
} from "./resources/BrdEdr_Test_RestResource.ts";
import {
    BrdEdr_Tools_PageResource
} from "./resources/BrdEdr_Tools_PageResource.ts";

export const BrdEdr_Services: Edr.Drash.Service[] = [
    new Edr.BrdEdr_AnyRequest_Service(),
]

export const BrdEdr_Resources: typeof Edr.Drash.Resource[] = [

    Edr.BrdEdr_AnyAsset_FileResource,
    Edr.BrdEdrAnyFileResource,
    Edr.BrdEdrAnyImageResource,

    BrdEdr_Home_PageResource,
    BrdEdr_Tools_PageResource,
    
    BrdEdr_Test_RestResource

];

