import { BusinessLineInterfaces } from "./business-line-interfaces";

export interface PositionInterfaces {
    id: number;
    name: string;
    created_at: null;
    updated_at: null;
    deleted_at: null;
    business_line: BusinessLineInterfaces; 
}
