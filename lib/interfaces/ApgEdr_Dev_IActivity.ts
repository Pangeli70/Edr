/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Dev]
 * @author [APG] ANGELI Paolo Giusto
 * @version 0.9.1 [APG 2024/10/18]
 * @version 1.0.0 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */

import { ApgEdr_Dev_ePriority } from "../enums/ApgEdr_Dev_ePriority.ts";
import { ApgEdr_Dev_eStatus } from "../enums/ApgEdr_Dev_eStatus.ts";



/**
 * The activity is the design and planning of the implementatin of one feature
 * aimed to fiulfil the user story. Essentially it is a task that will be accomplished 
 * by the developers by several days and by registering the progress with the events.
 */
export interface ApgEdr_Dev_IActivity {

    timestampId: string;
    microservice: string;
    storyId: string;
    description: string[];
    createdBy: string;
    estimatedHours: number;
    priority: ApgEdr_Dev_ePriority;
    status: ApgEdr_Dev_eStatus;

}

export type ApgEdr_Dev_IActivityKey = keyof ApgEdr_Dev_IActivity;




