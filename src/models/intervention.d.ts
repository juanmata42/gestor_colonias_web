export type Intervention = {
    [key: string]: string | Date | number
    id: string;
    user_id: string;
    factory_id: string;
    factory_contact: string;
    type: string;
    date: Date;
    arrival_time: string;
    leave_time: string;
    discrepancies: number;
    description_EN: string;
    description_BN: string;
    created_at: Date;
    updated_at: Date;
}

export type InterventionInput = {
    [key: string]: string | Date | number
    id?: string;
    user_id: string;
    factory_id: string;
    factory_contact: string;
    type: string;
    date: Date;
    arrival_time: string;
    leave_time: string;
    discrepancies: number;
    description_EN: string;
    description_BN: string;
    created_at?: Date;
    updated_at?: Date;
}
