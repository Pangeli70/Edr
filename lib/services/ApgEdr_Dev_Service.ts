/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Auth]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20241018
 * ----------------------------------------------------------------------------
 */

import {ApgEdr_Dev_Collection_Activities} from "../collections/ApgEdr_Dev_Collection_Activities.ts";
import {ApgEdr_Dev_Collection_Logs} from "../collections/ApgEdr_Dev_Collection_Logs.ts";
import {ApgEdr_Dev_Collection_Stories,
    ApgEdr_Dev_IStory_Schema} from "../collections/ApgEdr_Dev_Collection_Stories.ts";
import {ApgEdr_Microservice_Name} from "../data/ApgEdr_Data.ts";
import {Mng,
    Uts} from "../deps.ts";
import {ApgEdr_Dev_eFeasibility,
    ApgEdr_Dev_eOwner,
    ApgEdr_Dev_ePriority,
    ApgEdr_Dev_eStatus,
    ApgEdr_Dev_IActivity,
    ApgEdr_Dev_ILog,
    ApgEdr_Dev_IStory,
    ApgEdr_Dev_IStoryKey} from "../interfaces/ApgEdr_Dev_IActivity.ts";





export class ApgEdr_Dev_Service extends Uts.ApgUts_Service {

    protected static InitServiceName() {
        return ApgEdr_Dev_Service.name;
    }

    static #microservice: string = '';
    static #storyDomains: string[] = [];

    static #storiesCollectionName = 'DevStories';
    static #localStoriesCollection: ApgEdr_Dev_Collection_Stories | null = null;
    static #atlasStoriesCollection: ApgEdr_Dev_Collection_Stories | null = null;

    static #activitiesCollectionName = 'DevActivities';
    static #localActivitiesCollection: ApgEdr_Dev_Collection_Activities | null = null;
    static #atlasActivitiesCollection: ApgEdr_Dev_Collection_Activities | null = null;

    static #logsCollectionName = 'DevLogs';
    static #localLogsCollection: ApgEdr_Dev_Collection_Logs | null = null;
    static #atlasLogsCollection: ApgEdr_Dev_Collection_Logs | null = null;

    static #inited = false;



    static Setup(amicroservice: string) {
        this.#microservice = amicroservice;
    }



    static async InitOrThrow() {


        if (this.#inited) {
            return;
        }

        let r = await this.#InitStoriesCollection();

        if (r.ok) {
            r = await this.#InitActivitiesCollection();
        }

        if (r.ok) {
            r = await this.#InitLogsCollection();
        }

        if (!r.ok) {
            throw new Error(r.joinMessages('\n'));
        }

        this.#inited = true;
        
        if (!await this.#isSeeded()) {
            const rs = await this.Seed('Admin');
            
            if (!rs.ok) {
                throw new Error(rs.joinMessages('\n'));
            }
        }
        
        const r2 = await this.GetStoryDomains();
        
        if (!r2.ok) {
            throw new Error(r2.joinMessages('\n'));
        }
        
        this.#storyDomains = r2.payload!;
    }



    static async #InitStoriesCollection() {

        const r = await Mng.ApgMng_Service.getDbCollectionPair<ApgEdr_Dev_IStory>(this.#storiesCollectionName);

        if (r.ok) {

            const localStoriesCollection = r.payload?.local;
            if (localStoriesCollection) {
                this.#localStoriesCollection = new ApgEdr_Dev_Collection_Stories(localStoriesCollection);
            }

            const atlasStoriesCollection = r.payload?.atlas;
            if (atlasStoriesCollection) {
                this.#atlasStoriesCollection = new ApgEdr_Dev_Collection_Stories(atlasStoriesCollection);
            }

        }

        return r as Uts.ApgUts_Result<unknown>;
    }



    static async #InitActivitiesCollection() {


        const r = await Mng.ApgMng_Service.getDbCollectionPair<ApgEdr_Dev_IActivity>(this.#activitiesCollectionName);


        if (r.ok) {

            const localCollection = r.payload?.local;
            if (localCollection) {
                this.#localActivitiesCollection = new ApgEdr_Dev_Collection_Activities(localCollection);
            }

            const atlasCollection = r.payload?.atlas;
            if (atlasCollection) {
                this.#atlasActivitiesCollection = new ApgEdr_Dev_Collection_Activities(atlasCollection);
            }

        }

        return r as Uts.ApgUts_Result<unknown>;;
    }



    static async #InitLogsCollection() {


        const r = await Mng.ApgMng_Service.getDbCollectionPair<ApgEdr_Dev_ILog>(this.#logsCollectionName);


        if (r.ok) {

            const localCollection = r.payload?.local;
            if (localCollection) {
                this.#localLogsCollection = new ApgEdr_Dev_Collection_Logs(localCollection);
            }

            const atlasCollection = r.payload?.atlas;
            if (atlasCollection) {
                this.#atlasLogsCollection = new ApgEdr_Dev_Collection_Logs(atlasCollection);
            }

        }

        return r as Uts.ApgUts_Result<unknown>;;
    }



    static async #isSeeded() {

        const storiesCollection = this.#atlasStoriesCollection || this.#localStoriesCollection;

        const rca = await storiesCollection!.countAll();

        return rca.ok && rca.payload! > 0;

    }



    static async ListStoryOwners(amicroservice: string) {

        await this.InitOrThrow();
        const r = new Uts.ApgUts_Result<string[]>();

        const filter = { microservice: amicroservice } as Mng.Mongo.Filter<ApgEdr_Dev_IStory>;

        const storiesCollection = this.#atlasStoriesCollection || this.#localStoriesCollection;
        const key: ApgEdr_Dev_IStoryKey = 'owner';

        const payload: string[] = [];

        const owners = await storiesCollection!
            .collection.distinct(key, filter)

        if (Array.isArray(owners)) {
            payload.push(...owners);
        }
        else if (typeof owners === 'string') {
            payload.push(owners);
        }

        r.setPayload(payload);

        return r;

    }



    static async GetStoryDomains(amicroservice?: string) {

        await this.InitOrThrow();
        const r = new Uts.ApgUts_Result<string[]>();

        if (!amicroservice) {
            amicroservice = this.#microservice
        }

        const filter = { microservice: amicroservice } as Mng.Mongo.Filter<ApgEdr_Dev_IStory>;

        const storiesCollection = this.#atlasStoriesCollection || this.#localStoriesCollection;
        const key: ApgEdr_Dev_IStoryKey = 'domain';

        const payload: string[] = [];

        const domains = await storiesCollection!
            .collection.distinct(key, filter)

        if (Array.isArray(domains)) {
            payload.push(...domains);
        }
        else if (typeof domains === 'string') {
            payload.push(domains);
        }

        r.setPayload(payload);

        return r;

    }



    static async ListStoriesByDomain(adomain: string, amicroservice?: string) {

        await this.InitOrThrow();
        let r = new Uts.ApgUts_Result<ApgEdr_Dev_IStory[]>();

        if (!amicroservice) {
            amicroservice = this.#microservice
        }

        const filter = {
            microservice: amicroservice,
            domain: adomain
        } as Mng.Mongo.Filter<ApgEdr_Dev_IStory>;

        const storiesCollection = this.#atlasStoriesCollection || this.#localStoriesCollection;

        r = await storiesCollection!.searchByFilter(filter)

        return r;
    }



    static async ListStoriesByOwner(aowner: string, amicroservice?: string) {

        await this.InitOrThrow();
        let r = new Uts.ApgUts_Result<ApgEdr_Dev_IStory[]>();

        if (!amicroservice) {
            amicroservice = this.#microservice
        }

        const filter = {
            microservice: amicroservice,
            uwner: aowner
        } as Mng.Mongo.Filter<ApgEdr_Dev_IStory>;

        const storiesCollection = this.#atlasStoriesCollection || this.#localStoriesCollection;

        r = await storiesCollection!.searchByFilter(filter)

        return r;
    }


    static async GetStoryById(aid: string) { 

        await this.InitOrThrow();
        let r = new Uts.ApgUts_Result<ApgEdr_Dev_IStory_Schema>();

        const filter = {
            microservice: this.#microservice,
            timestampId: aid
        } as Mng.Mongo.Filter<ApgEdr_Dev_IStory>;

        const storiesCollection = this.#atlasStoriesCollection || this.#localStoriesCollection;

        r = await storiesCollection!.searchOneByFilter(filter);

        return r;
    }



    static async ListActivitiesByStory(astoryId: string) {

        await this.InitOrThrow();
        let r = new Uts.ApgUts_Result<ApgEdr_Dev_IActivity[]>();

        const filter = {
            storyId: astoryId,
        } as Mng.Mongo.Filter<ApgEdr_Dev_IActivity>;

        const activitiesCollection = this.#atlasActivitiesCollection || this.#localActivitiesCollection;

        r = await activitiesCollection!.searchByFilter(filter);

        return r;
    }



    static async ListLogsByActivity(aactivityId: string) {

        await this.InitOrThrow();
        let r = new Uts.ApgUts_Result<ApgEdr_Dev_ILog[]>();

        const filter = {
            activityId: aactivityId,
        } as Mng.Mongo.Filter<ApgEdr_Dev_ILog>;

        const logsCollection = this.#atlasLogsCollection || this.#localLogsCollection;

        r = await logsCollection!.searchByFilter(filter);


        return r;
    }



    /**
     * Function to be called to seed the database
     */
    static async Seed(auser: string) {

        await this.InitOrThrow();

        let total = 0;
        const r = new Uts.ApgUts_Result<number>();
        const METHOD = this.Method(this.Seed);

        const rss = await this.#seedStories(auser);
        if (!rss.ok) {
            return this.Error(r, METHOD, 'Impossible to seed stories', rss.messages)
        }
        const storiesIds = rss.payload!;
        total += storiesIds.length;

        const rsa = await this.#seedActivities(auser, storiesIds);
        if (!rsa.ok) {
            return this.Error(r, METHOD, 'Impossible to seed activities', rsa.messages)
        }
        const activitiesIds = rss.payload!;
        total += activitiesIds.length;

        const rsl = await this.#seedLogs(auser, activitiesIds);
        if (!rsl.ok) {
            return this.Error(r, METHOD, 'Impossible to seed logs', rsl.messages)
        }
        const logsIds = rsl.payload!;
        total += logsIds.length;

        r.setPayload(total);
        return r;

    }



    static async #seedStories(auser: string) {

        const r = new Uts.ApgUts_Result<string[]>();
        const METHOD = this.Method(this.Seed);

        const timestamps: string[] = [];

        for (let i = 1; i <= 3; i++) {
            timestamps.push(Uts.ApgUts_DateTimeStamp.GetNow(i));
        }

        const seeds: ApgEdr_Dev_IStory[] = [
            {
                microservice: ApgEdr_Microservice_Name,
                timestampId: timestamps[0],
                domain: "Seed",
                owner: ApgEdr_Dev_eOwner.OWNER,
                expectation: "The first expectation",
                outcome: "The first outcome",
                notes: "Note 1",
                tools: "The first tool",
                createdBy: auser,
                feasibility: ApgEdr_Dev_eFeasibility.MAYBE
            },
            {
                microservice: ApgEdr_Microservice_Name,
                timestampId: timestamps[1],
                domain: "Seed",
                owner: ApgEdr_Dev_eOwner.DEVELOPER,
                expectation: "The second expectation",
                outcome: "The second outcome",
                notes: "Note 2",
                tools: "The second tool",
                createdBy: auser,
                feasibility: ApgEdr_Dev_eFeasibility.MAYBE
            },
            {
                microservice: ApgEdr_Microservice_Name,
                timestampId: timestamps[2],
                domain: "Seed",
                owner: ApgEdr_Dev_eOwner.USER,
                expectation: "The third expectation",
                outcome: "The third outcome",
                notes: "Note 3",
                tools: "The third tool",
                createdBy: auser,
                feasibility: ApgEdr_Dev_eFeasibility.YES
            },
        ];

        const storiesCollection = this.#atlasStoriesCollection || this.#localStoriesCollection;
        const ri = await storiesCollection!.createMany(seeds);

        if (!ri.ok) {
            return this.Error(r, METHOD, 'Insertion of seed Stories in collection failed', ri.messages)
        }

        this.LogInfo(METHOD, `Seeding database with ${ri.payload} stories`)


        r.setPayload(timestamps);


        return r;
    }



    static async #seedActivities(
        auser: string,
        astoryIds: string[]
    ) {
        const r = new Uts.ApgUts_Result<string[]>();
        const METHOD = this.Method(this.Seed);

        const timestamps: string[] = [];

        for (let i = 1; i <= 3; i++) {
            timestamps.push(Uts.ApgUts_DateTimeStamp.GetNow(i));
        }


        const activities: ApgEdr_Dev_IActivity[] = [
            {
                microservice: ApgEdr_Microservice_Name,
                timestampId: timestamps[0],
                storyId: astoryIds[0],
                description: ["Seedin activity for story 1"],
                createdBy: auser,
                estimatedHours: 1,
                status: ApgEdr_Dev_eStatus.NEW,
                priority: ApgEdr_Dev_ePriority.LOW,
            },
            {
                microservice: ApgEdr_Microservice_Name,
                timestampId: timestamps[1],
                storyId: astoryIds[1],
                description: ["Seeding activity for story 2"],
                createdBy: auser,
                estimatedHours: 5.5,
                status: ApgEdr_Dev_eStatus.APPROVED,
                priority: ApgEdr_Dev_ePriority.MEDIUM,
            },
            {
                microservice: ApgEdr_Microservice_Name,
                timestampId: timestamps[3],
                storyId: astoryIds[1],
                description: ["Seeding another activity for story 2"],
                createdBy: auser,
                estimatedHours: 1.5,
                status: ApgEdr_Dev_eStatus.IN_PROGRESS,
                priority: ApgEdr_Dev_ePriority.CURRENT,
            },
        ];

        const activitiesCollection = this.#atlasActivitiesCollection || this.#localActivitiesCollection;
        const ri = await activitiesCollection!.createMany(activities);

        if (!ri.ok) {
            return this.Error(r, METHOD, 'Insertion of seed Activities in collection failed', ri.messages)
        }

        this.LogInfo(METHOD, `Seeding database with ${r.payload} Backlog Activities`);

        r.setPayload(timestamps)

        return r;
    }



    static async #seedLogs(
        auser: string,
        activityIds: string[]
    ) {
        const r = new Uts.ApgUts_Result<string[]>();
        const METHOD = this.Method(this.Seed);

        const timestamps: string[] = [];

        for (let i = 1; i <= 3; i++) {
            timestamps.push(Uts.ApgUts_DateTimeStamp.GetNow(i));
        }


        const logs: ApgEdr_Dev_ILog[] = [
            {
                timestampId: timestamps[0],
                activityId: activityIds[1],
                description: [`Seeding log for activity [${activityIds[1]}]`],
                createdAt: new Date(),
                createdBy: auser,
                spentHours: 4,
            },
            {
                timestampId: timestamps[1],
                activityId: activityIds[2],
                description: [`Seeding log for activity [${activityIds[2]}]`],
                createdAt: new Date(),
                createdBy: auser,
                spentHours: 1,
            }, {
                timestampId: timestamps[2],
                activityId: activityIds[2],
                description: [
                    `Seeding another log for activity [${activityIds[2]}]`,
                    'And this has a couple of rows'
                ],
                createdAt: new Date(),
                createdBy: auser,
                spentHours: 5.25,
            }
        ];

        const logsCollection = this.#atlasLogsCollection || this.#localLogsCollection;
        const ri = await logsCollection!.createMany(logs);

        if (!ri.ok) {
            return this.Error(r, METHOD, 'Insertion of seed Logs in collection failed', ri.messages)
        }

        this.LogInfo(METHOD, `Seeding database with ${r.payload} Logs`);


        r.setPayload(timestamps)
        return r;
    }


}