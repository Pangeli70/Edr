/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Mail]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20240701
 * @version 0.2 APG 20241017 Extends ApgUts_Service
 * ----------------------------------------------------------------------------
 */

import {
    Mng,
    Uts
} from "../deps.ts";
import {
    ApgEdr_Env_eEntry
} from "../enums/ApgEdr_Env_eEntry.ts";

interface ApgEdr_MongoDb_CollectionPair<T extends Mng.Mongo.Document> {
    local?: Mng.Mongo.Collection<T>;
    atlas?: Mng.Mongo.Collection<T>;
}

/**
 * Service used to manage the MongoDb pair for persistency
 *  - Local is used for development and testing purposes
 *  - Atlas is used for production
 */
export class ApgEdr_MongoDb_Service extends Uts.ApgUts_Service {


    static override InitServiceName() {
        return ApgEdr_MongoDb_Service.name;
    }


    private static dbName = 'ApgEdr';

    private static _doLocalDb = false;
    private static _doAtlasDb = false;


    static Setup(
        adbName: string,
        adoLocalDb: boolean,
        adoAtlasDb: boolean
    ) {
        this.dbName = adbName;

        // On deploy, we don't use local DB
        this._doLocalDb = Uts.ApgUts_Is.IsDeploy() ? false : adoLocalDb;

        this._doAtlasDb = adoAtlasDb;

    }


    static async Init() {

        const r = new Uts.ApgUts_Result<void>();

        if (this._doLocalDb) {
            const r1 = await this.#initLocalDb();
            if (!r1.ok) {
                r.ok = false;
                r.message(this.Init.name, `Impossibile to connect to [${this.dbName}] Local database`, r1.messages)
            }
        }

        if (this._doAtlasDb) {
            const r2 = await this.#initAtlasDb();
            if (!r2.ok) {
                r.ok = false;
                r.message(this.Init.name, `Impossibile to connect to [${this.dbName}] Database database`, r2.messages)
            }
        }

        return r;

    }



    static async #initLocalDb() {

        const options =
        {
            mongoHost: "",
            user: "",
            password: "",
        }

        const r = await Mng.ApgMng_Service_Connector.Connect(
            Mng.ApgMng_eMode.local,
            this.dbName,
            options
        );

        if (!r.ok) {
            r.ok = false;
            r.message(this.#initLocalDb.name, `Impossibile to connect to [${this.dbName}] database`, r.messages)
        }

        return r;

    };



    static async #initAtlasDb() {


        const ATLAS_HOST = Deno.env.get(ApgEdr_Env_eEntry.ATLAS_HOST);
        if (ATLAS_HOST == undefined) {
            throw new Error("No Mongo DB Atlas Host provided in environment variables");
        }
        const ATLAS_USER = Deno.env.get(ApgEdr_Env_eEntry.ATLAS_USER);
        if (ATLAS_USER == undefined) {
            throw new Error("No Mongo DB Atlas User provided in environment variables");
        }
        const ATLAS_PWD = Deno.env.get(ApgEdr_Env_eEntry.ATLAS_PWD);
        if (ATLAS_PWD == undefined) {
            throw new Error("No Mongo DB Atlas Password provided in environment variables");
        }

        const options =
        {
            mongoHost: ATLAS_HOST || "",
            user: ATLAS_USER || "",
            password: ATLAS_PWD || "",
        }

        const r = await Mng.ApgMng_Service_Connector.Connect(
            Mng.ApgMng_eMode.atlas,
            this.dbName,
            options
        );

        if (!r.ok) {
            r.ok = false;
            r.message(this.#initAtlasDb.name, `Impossibile to connect to [${this.dbName}] database`, r.messages)
        }

        return r;

    };



    static async getDbCollectionPair<T extends Mng.Mongo.Document>(
        aname: string,
    ) {

        await this.Init();

        const r = new Uts.ApgUts_Result<ApgEdr_MongoDb_CollectionPair<T>>();


        const p: ApgEdr_MongoDb_CollectionPair<T> = {}


        if (this._doLocalDb) {

            const dbKey = this.dbName + "_" + Mng.ApgMng_eMode.local;
            const dbCollection = Mng.ApgMng_Service_Connector.Collection<T>(dbKey, aname);

            if (!dbCollection) {
                r.ok = false;
                r.message(this.getDbCollectionPair.name, `[${aname}] collection in [${this.dbName}] Local DB not found`)
            }
            else {
                p.local = dbCollection;
            }
        }

        if (this._doAtlasDb) {

            const dbKey = this.dbName + "_" + Mng.ApgMng_eMode.atlas;
            const dbCollection = Mng.ApgMng_Service_Connector.Collection<T>(dbKey, aname);

            if (!dbCollection) {
                r.ok = false;
                r.message(this.getDbCollectionPair.name, `[${aname}] collection in [${this.dbName}] Atlas DB not found`)
            }
            else {
                p.atlas = dbCollection;
            }
        }

        r.setPayload(p, 'asignature')

        return r;
    }
}

