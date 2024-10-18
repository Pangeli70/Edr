/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240929
 * @version 0.2 APG 20241017 Extends ApgUts_Service
 * ----------------------------------------------------------------------------
 */

import {
    ApgEdr_Collection_Telemetry
} from "../classes/ApgEdr_Collection_Telemetry.ts";
import {
    Mng,
    Uts
} from "../deps.ts";
import {
    ApgEdr_IRequest
} from "../interfaces/ApgEdr_IRequest.ts";
import {
    ApgEdr_MongoDb_Service
} from "./ApgEdr_Mng_Service.ts";



/**
 * Telemetry collections service
 */
export class ApgEdr_Telemetry_Service extends Uts.ApgUts_Service {

    protected static InitServiceName(): string {
        return ApgEdr_Telemetry_Service.name;
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



    static async Init() {

        if (this.#inited) {
            return;
        }

        const r = await ApgEdr_MongoDb_Service.getDbCollectionPair<ApgEdr_IRequest>(this.#collectionName);


        if (!r.ok) {
            throw new Error(r.messages.join('\n'));
        }

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
        }
    }



    static async Send(
        aedr: ApgEdr_IRequest
    ) {

        this.Init();

        this.#buffer.push(aedr);

        const r = new Uts.ApgUts_Result<number[]>();

        if (this.#buffer.length < this.#bufferSize) {
            return r;
        }
        const p = [0, 0];

        try {
            let r1 = new Uts.ApgUts_Result<Mng.ApgMng_TMultipleInsertResult>();

            if (this.#localCollection) {
                r1 = await this.#localCollection.insertMany(this.#buffer);
                if (r1.ok) {
                    p[0] = r1.payload?.insertedIds?.length ?? 0;
                }
            }

            if (this.#atlasCollection) {
                r1 = await this.#atlasCollection.insertMany(this.#buffer);
                if (r1.ok) {
                    p[1] = r1.payload?.insertedIds?.length ?? 0;
                }
            }

            r.setPayload(p, 'Array<number>');
            this.#buffer = [];
        }
        catch (e) {
            r.ok = false;
            const m = this.Method(this.Send);
            r.message(m, e.message);
        }
        return r;

    }



    static async Purge() {

        this.Init();

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

        return r;
    }
}

