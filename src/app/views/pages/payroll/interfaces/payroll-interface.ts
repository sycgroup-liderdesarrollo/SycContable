import { EmployeeInterface } from "../../administrative/employees/interfaces/employee-interface";
import { ConceptInterface } from "./concept-interface";
import { PeriodInterface } from "./period-interface";
import { ProvisionInterface } from "./provision-interface";

export interface PayrollInterface{
  id: number,
  period_id: number,
  user_id: number,
  provision_id: number,
  created_at: Date,
  provision: ProvisionInterface,
  user: EmployeeInterface,
  period: PeriodInterface,
  concepts: ConceptInterface[],
  pivot:any,
}
