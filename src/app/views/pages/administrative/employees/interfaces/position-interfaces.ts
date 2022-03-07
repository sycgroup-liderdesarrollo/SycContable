import { BusinessLineInterfaces } from "./business-line-interfaces";

export interface PositionInterfaces {
    id: number;
    name: string;
    business_line: BusinessLineInterfaces;
}
