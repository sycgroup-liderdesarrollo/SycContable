import { EmployeeInterface } from "./employee-interface";

export interface VacationInterface{
  id: number,
  end_date: Date,
  user_id: number,
  start_date: Date,
  total_days: number,
  user: EmployeeInterface
}
