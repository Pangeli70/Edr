/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2024/10/18]
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { ApgEdr_Dev_eFeasibility } from "../enums/ApgEdr_Dev_eFeasibility.ts";
import { ApgEdr_Dev_eOwner } from "../enums/ApgEdr_Dev_eOwner.ts";


/**
 * The user story describes an idea of a feature to be implemented.
 * Some fields are used to evaluatae the feasibility of the idea.
 */
export interface ApgEdr_Dev_IStory {

    /**
     * Identifier to be used in the MongoDB
     */
    timestampId: string;

    /**
     * Name of the microservice which this story is about
     */
    microservice: string;

    /**
     * Domain or title of the story
     */
    domain: string;

    /**
     * Who is the owner of this story
     */
    owner: ApgEdr_Dev_eOwner;

    /**
     * Which is the expectation of this story
     */
    expectation: string;

    /**
     * Which is the outcome of this story
     */
    outcome: string;

    /**
     * Some annotations
     */
    notes: string;

    /**
     * Which tools could be used to achieve this story
     */
    tools: string;

    /**
     * Name of the person who created this story
     */
    issuer: string;

    /**
     * Feasibility evaluation of this story
     */
    feasibility: ApgEdr_Dev_eFeasibility;

}

export type ApgEdr_Dev_IStoryKey = keyof ApgEdr_Dev_IStory;

