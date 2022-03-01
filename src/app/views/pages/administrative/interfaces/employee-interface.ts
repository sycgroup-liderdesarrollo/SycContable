import { BusinessLineInterfaces } from "./business-line-interfaces";
import { GenderInterfaces } from "./gender-interfaces";
import { PositionInterfaces } from "./position-interfaces";

export interface EmployeeInterface {
    toLowerCase: any;
    id: number;
    name: string;
    last_name: string;
    second_last_name: string;
    identification_number: number;
    admission_date: Date;
    out_date: null;
    base_salary: number;
    email: string;
    email_verified_at: null;
    active: boolean;
    address: string;
    neighborhood: string;
    birthday: Date;
    children: number;
    phone: number;
    contract_type_id: number;
    salary_type_id: number;
    headquarter_id: number;
    identification_type_id: number;
    health_provider_id: number;
    pension_fund_id: number;
    civil_statu_id: number;
    work_city_id: number;
    residence_city_id: number;
    expedition_place_id: number;
    strata_id: number;
    education_level_id: number;
    emergency_contact_id: number;
    occupational_risk_manager_id: number;
    created_at: Date;
    updated_at: Date;
    deleted_at: null;
    gender:GenderInterfaces;
    position:PositionInterfaces;
    business_line:BusinessLineInterfaces;
}

