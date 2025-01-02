/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2024/09/29]
 * @version 0.9.2 [APG 2024/10/17] Extends ApgUts_Service
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { ApgEdr_Collection_Telemetry } from "../collections/ApgEdr_Collection_Telemetry.ts";
import { Mng, Uts } from "../deps.ts";
import { ApgEdr_IRequest } from "../interfaces/ApgEdr_IRequest.ts";



/**
 * Telemetry collections service
 */
export class ApgEdr_Service_Telemetry
    
    extends Uts.ApgUts_Service {

    
    protected static InitServiceName(): string {
        return ApgEdr_Service_Telemetry.name;
    }

    static readonly DEFAULT_BUFFER_SIZE = 5;

    static #collectionName = 'Telemetry';

    static #localCollection: ApgEdr_Collection_Telemetry | null = null;
    static #atlasCollection: ApgEdr_Collection_Telemetry | null = null;

    static #buffer: ApgEdr_IRequest[] = [];

    static #bufferSize = this.DEFAULT_BUFFER_SIZE;

    static #inited = false;


    static Setup(abufferSize: number) {

        if (abufferSize > 0) {
            this.#bufferSize = abufferSize;
        }
    }



    static async InitOrPanic() {

        if (this.#inited) {
            return;
        }

        const r = await Mng.ApgMng_Service.getDbCollectionPairOrPanic<ApgEdr_IRequest>(this.#collectionName);

        if (r.ok) {

            const localCollection = r.payload?.local;
            if (localCollection) {
                this.#localCollection = new ApgEdr_Collection_Telemetry(localCollection);
            }

            const atlasCollection = r.payload?.atlas;
            if (atlasCollection) {
                this.#atlasCollection = new ApgEdr_Collection_Telemetry(atlasCollection);
            }

            this.#inited = true;

            return;
        }

        Uts.ApgUts.PanicIf(!r.ok,r.joinMessages('\n'));
    }



    static async Send(
        aedr: ApgEdr_IRequest
    ) {

        this.InitOrPanic();

        const METHOD = this.Method(this.Send);
        const r = new Uts.ApgUts_Result<number[]>();

        this.#buffer.push(aedr);

        if (this.#buffer.length < this.#bufferSize) {
            return r;
        }
        const p = [0, 0];

        try {
            let r1 = new Uts.ApgUts_Result<Mng.ApgMng_TMultipleInsertResult>();

            if (this.#localCollection) {
                r1 = await this.#localCollection.createMany(this.#buffer);
                if (r1.ok) {
                    p[0] = r1.payload?.insertedIds?.length ?? 0;
                }
            }

            if (this.#atlasCollection) {
                r1 = await this.#atlasCollection.createMany(this.#buffer);
                if (r1.ok) {
                    p[1] = r1.payload?.insertedIds?.length ?? 0;
                }
            }

            r.setPayload(p);

            // TODO we have to remove from the buffer only the items that we have sent to 
            // the database not empty the buffer. [APG 2025/01/02]
            this.#buffer = [];
        }
        catch (e) {
            return this.Error(r, METHOD, e.message);
        }

        this.LogInfo(this.Send.name, `Called for request [${aedr.counter}]`);
        return r;

    }



    static async Purge() {

        this.InitOrPanic();

        const r = new Uts.ApgUts_Result<number[]>();
        const p = [0, 0];

        let r1 = new Uts.ApgUts_Result<number>();

        if (this.#localCollection) {
            r1 = await this.#localCollection.deleteAll();
            if (r1.ok) {
                p[0] = r1.payload ?? 0;
            }
        }
        if (this.#atlasCollection) {
            r1 = await this.#atlasCollection.deleteAll();
            if (r1.ok) {
                p[1] = r1.payload ?? 0;
            }
        }

        this.LogInfo(this.Purge.name, `Called`);
        
        return r;
    }
}

