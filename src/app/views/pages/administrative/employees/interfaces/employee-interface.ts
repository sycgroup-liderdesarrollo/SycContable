import { BusinessLineInterface } from "./business-line-interfaces";
import { CityInterface } from "./city-interface";
import { ContractTypeInterface } from "./contract-type-interface";
import { EmergencyContactInterface } from "./emergency-contact-interface";
import { GenderInterface } from "./gender-interface";
import { PositionInterfaces } from "./position-interfaces";

export interface EmployeeInterface {
    id:                             number;
    name:                           string;
    last_name:                      string;
    second_last_name:               string;
    identification_number:          string;
    admission_date:                 Date;
    out_date:                       Date;
    base_salary:                    number;
    email:                          string;
    email_verified_at:              Date;
    active:                         boolean;
    address:                        string;
    neighborhood:                   string;
    birthday:                       Date;
    children:                       number;
    phone:                          number;
    contract_type_id:               number;
    salary_type_id:                 number;
    headquarter_id:                 number;
    identification_type_id:         number;
    health_provider_id:             number;
    pension_fund_id:                number;
    civil_status_id:                number;
    work_city_id:                   number;
    residence_city_id:              number;
    expedition_place_id:            number;
    strata_id:                      number;
    education_level_id:             number;
    emergency_contact_id:           number;
    gender_id:                      number
    position_id:                    number
    occupational_risk_manager_id:   number;
    gender:                         GenderInterface;
    position:                       PositionInterfaces;
    business_line:                  BusinessLineInterface;
    pivot:                          any,
    length:                         number,
    residenceCity:                  CityInterface
    contractType:                   ContractTypeInterface,
    password:                       string,
    image:                          string,
    expeditionPlace:                CityInterface,
    work_city:                      CityInterface
    emergencyContact:               EmergencyContactInterface
}

