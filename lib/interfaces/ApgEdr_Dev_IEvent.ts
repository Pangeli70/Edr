/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.9.1 [APG 2024/10/18]
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


/**
 * The event is the registration of the work done to implement the feature
 * as deigned in the activity related to the user story.
 */
export interface ApgEdr_Dev_IEvent {

    timestampId: string;
    activityId: string;
    description: string[];
    createdAt: Date;
    createdBy: string;
    spentHours: number;

}

export type ApgEdr_Dev_LogKey = keyof ApgEdr_Dev_IEvent;



