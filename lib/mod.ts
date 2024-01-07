/** ---------------------------------------------------------------------------
 * @module [BrdEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * ----------------------------------------------------------------------------
 */

export * from "./classes/BrdEdr_Service.ts"

export * from "./enums/BrdEdr_eRestRouteGetMode.ts"

export * from "./interfaces/BrdEdr_IRestBodyParamHelp.ts"
export * from "./interfaces/BrdEdr_IRestGetRouteHelp.ts"
export * from "./interfaces/BrdEdr_IRestPathParamHelp.ts"
export * from "./interfaces/BrdEdr_IRestPayloadHelp.ts"
export * from "./interfaces/BrdEdr_IRestPostRouteHelp.ts"
export * from "./interfaces/BrdEdr_IRestQSParamHelp.ts"
export * from "./interfaces/BrdEdr_IRestRouteHelp.ts"


export { BrdEdrAnyImageResource } from "./resources/BrdEdrAnyImageResource.ts";
export { BrdEdrAnyFileResource } from "./resources/BrdEdrAnyFileResource.ts";
export { BrdEdr_AnyAsset_FileResource } from "./resources/BrdEdr_AnyAsset_FileResource.ts";

export * from "./resources/BrdEdr_Base_RestResource.ts";

export { BrdEdr_AnyRequest_Service } from "./services/BrdEdr_AnyRequest_Service.ts";

export { Drash } from "./imports/drash.ts"
