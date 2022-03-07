import { PeriodInterface } from "./period-interface";

export interface ProvisionInterface{
  id:number,
  Interest_on_severance_pay: number,
  compensation_funds: number,
  health_contribution: number,
  layoffs: number,
  occupational_risk_contributions: number,
  pension_contribution: number,
  period_id: number,
  period: PeriodInterface,
  total_payroll: number,
  total_provisions: number,
  vacation_provision: number,
  wage_premium: number
}
