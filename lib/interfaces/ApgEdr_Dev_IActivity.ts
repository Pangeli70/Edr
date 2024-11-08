/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20241018
 * ----------------------------------------------------------------------------
 */



export interface ApgEdr_Dev_IStory {

    timestampId: string;
    microservice: string;
    domain: string;
    owner: ApgEdr_Dev_eOwner;
    expectation: string;
    outcome: string;
    notes: string;
    tools: string;
    createdBy: string;
    feasibility: ApgEdr_Dev_eFeasibility;

}

export type ApgEdr_Dev_IStoryKey = keyof ApgEdr_Dev_IStory;



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




export interface ApgEdr_Dev_ILog {

    timestampId: string;
    activityId: string;
    description: string[];
    createdAt: Date;
    createdBy: string;
    spentHours: number;

}

export type ApgEdr_Dev_LogKey = keyof ApgEdr_Dev_ILog;



export enum ApgEdr_Dev_eStatus {

    UNDEFINED = "0_ND",
    NEW = "1_New",
    APPROVED = "2_Approved",
    REJECTED = "3_Rejected",
    PLANNING = "4_Planning",
    IN_PROGRESS = "5_InProgress",
    TESTING = "6_Testing",
    COMPLETED = "7_Done",
}

export enum ApgEdr_Dev_eFeasibility {

    UNDEFINED = "0_ND",
    YES = "1_Yes",
    MAYBE = "2_Maybe",
    NO = "3_No",
}

export enum ApgEdr_Dev_ePriority {

    UNDEFINED = "0_ND",
    LOW = "1_Low",
    MEDIUM = "2_Medium",
    HIGH = "3_High",
    URGENT = "4_Urgent",
    NEXT = "5_Next",
    CURRENT = "6_Current",
}



export enum ApgEdr_Dev_eOwner {

    UNDEFINED = "0_ND",
    OWNER = "1_Owner",
    DEVELOPER = "2_Developer",
    USER = "3_User",
}