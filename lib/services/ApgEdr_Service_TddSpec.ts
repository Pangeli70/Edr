/** -----------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.3 [APG 2022/12/13] Deno Deploy Beta
 * @version 0.9.7 [APG 2023/05/08] Separation of concerns Lib/Srv
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * -----------------------------------------------------------------------
 */

import { Spc, Uts } from "../deps.ts";



/**
 * Test drive development specification results service
 */
export class ApgEdr_Service_TddSpec

    extends Uts.ApgUts_Service {


    protected static InitServiceName(): string {
        return ApgEdr_Service_TddSpec.name;
    }

    static readonly DEFAULT_STACK_SIZE = 10;

    private static _suites: Map<string, Spc.ApgSpc_TSuite> = new Map();


    static AddSuite(asuite: Spc.ApgSpc_TSuite,) {
        if (!this._suites.has(asuite.name)) {
            this._suites.set(asuite.name, asuite);
        }
    }



    static async RunSuite(asuite: string) {

        let r = new Uts.ApgUts_Result<void>();

        if (!this._suites.has(asuite)) {
            return r.error(this.RunSuite.name, `Test suite [${asuite}] not found`);
        }

        const suite = this._suites.get(asuite)!;

        Spc.ApgSpc_Service.Reset();
        await suite.spec.Run(Spc.ApgSpc_eRun.yes);
        const result = Spc.ApgSpc_Service.Result();

        r = this.StoreResult(asuite, result)
        Spc.ApgSpc_Service.Reset();

        return r;
    }




    static StoreResult(
        asuite: string,
        aresult: Spc.ApgSpc_TSpecResult
    ) {

        const r = new Uts.ApgUts_Result<void>();

        if (!this._suites.has(asuite)) {
            return r.error(this.StoreResult.name, `Test suite [${asuite}] not found`);
        }

        const suite = this._suites.get(asuite)!;

        if (suite.results.length == this.DEFAULT_STACK_SIZE) {
            suite.results.splice(0, 1);
        }

        suite.results.push(aresult);

        return r;

    }



    static Suites() {
        const keys = this._suites.keys();
        const r = Array.from(keys).sort();
        return r;
    }



    static Results(asuite: string) {

        if (!this._suites.has(asuite)) {
            return [];
        }
        const results = this._suites.get(asuite)!.results;
        const r: Date[] = [];
        for (const result of results) {
            r.push(result.execution);
        }
        return results.sort( (a,b)=> b.execution.valueOf() - a.execution.valueOf());
    }



    static LastSpecResult(
        asuite: string
    ) {
        if (!this._suites.has(asuite)) {
            return null;
        }
        const suite = this._suites.get(asuite)!;

        const lastIndex = suite.results.length - 1;
        const r = suite.results[lastIndex];
        return r;
    }




    /**
     * Get the events of the spec. 
     * @param aindex If negative returns the last
     */
    static SpecResultByIndex(
        asuite: string,
        aindex: number
    ) {

        if (isNaN(aindex)) {
            return null;
        }

        if (!this._suites.has(asuite)) {
            return null;
        }


        const results = this._suites.get(asuite)!.results;
        if (aindex >= results.length) {
            return null;
        }
        if (results.length == 0) {
            return null;
        }

        // means last
        if (aindex < 0) {
            aindex = results.length - 1
        }

        const r = results[aindex];
        return r;
    }

    

    static Flags(
        asuite: string
    ) {
        if (!this._suites.has(asuite)) {
            return null;
        }

        const spec = this._suites.get(asuite)!.spec;
        return spec.flags
    }
}