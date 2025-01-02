/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto
 * @version 1.0.0 [APG 2024/12/24] Extracted from server
 * ----------------------------------------------------------------------------
 */


import { Edr, Mng, MngSpecs, SpcSpecs } from "../deps.ts";


Edr.ApgEdr_Service_TddSpec.AddSuite({
    name: SpcSpecs.Specs.ApgSpc_Spec_ApgUts_Math.name,
    spec: new SpcSpecs.Specs.ApgSpc_Spec_ApgUts_Math(),
    results: []
});

Edr.ApgEdr_Service_TddSpec.AddSuite({
    name: SpcSpecs.Specs.ApgSpc_Spec_ApgUts_Object.name,
    spec: new SpcSpecs.Specs.ApgSpc_Spec_ApgUts_Object(),
    results: []
});

Edr.ApgEdr_Service_TddSpec.AddSuite({
    name: MngSpecs.Specs.ApgMng_Spec.name + "_" + Mng.ApgMng_eMode.local,
    spec: new MngSpecs.Specs.ApgMng_Spec(Mng.ApgMng_eMode.local),
    results: []
});

Edr.ApgEdr_Service_TddSpec.AddSuite({
    name: MngSpecs.Specs.ApgMng_Spec.name + "_" + Mng.ApgMng_eMode.atlas,
    spec: new MngSpecs.Specs.ApgMng_Spec(Mng.ApgMng_eMode.atlas),
    results: []
});
