import { BusinessLineInterface } from "./business-line-interfaces";

export interface PositionInterfaces {
  id: number;
  name: string;
  business_line: BusinessLineInterface;
}
