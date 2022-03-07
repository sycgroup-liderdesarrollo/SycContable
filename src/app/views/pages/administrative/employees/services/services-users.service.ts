import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResponseInterfaces } from 'src/app/interfaces/json-response-interfaces';
import { environment } from 'src/environments/environment';
import { BusinessLineInterface } from '../interfaces/business-line-interfaces';
import { CityInterface } from '../interfaces/city-interface';
import { CivilStatusInterface } from '../interfaces/civil-status-interface';
import { ContractTypeInterface } from '../interfaces/contract-type-interface';
import { EducationLevelInterface } from '../interfaces/education-level-interface';
import { GenderInterface } from '../interfaces/gender-interface';
import { HeadquarterInterface } from '../interfaces/headquarter-interface';
import { HealthProviderInterface } from '../interfaces/health-provider-interface';
import { IdentificationTypeInterface } from '../interfaces/identification-type-interface';
import { KinkshipInterface } from '../interfaces/kinkship-interface';
import { ocupationalRiskManagerInterface } from '../interfaces/ocupational-risk-manager-interface';
import { PensionFundInterface } from '../interfaces/pension-fund-interface';
import { PositionInterfaces } from '../interfaces/position-interfaces';
import { ProvinceInterface } from '../interfaces/province-interface';
import { SalaryTypeInterface } from '../interfaces/salary-type-interface';
import { StrataInterface } from '../interfaces/strata-interface';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getIdentificationTypes() :Observable<JsonResponseInterfaces<IdentificationTypeInterface[]>> {
    return this.http.get<JsonResponseInterfaces<IdentificationTypeInterface[]>>(`${environment.API_Url}identificationType`);
  }
  getCities(province_id?: number) : Observable<JsonResponseInterfaces<CityInterface[]>>{
    if (province_id) {
      return this.http.get<JsonResponseInterfaces<CityInterface[]>>(`${environment.API_Url}city`, {params:{'province_id':  province_id }});
    }else{
      return this.http.get<JsonResponseInterfaces<CityInterface[]>>(`${environment.API_Url}city`);
    }
  }
  getStrata() : Observable<JsonResponseInterfaces<StrataInterface[]>>{
    return this.http.get<JsonResponseInterfaces<StrataInterface[]>>(`${environment.API_Url}strata`);
  }
  getGenders() : Observable<JsonResponseInterfaces<GenderInterface[]>>{
    return this.http.get<JsonResponseInterfaces<GenderInterface[]>>(`${environment.API_Url}gender`);
  }
  getCivilStatus() : Observable<JsonResponseInterfaces<CivilStatusInterface[]>>{
    return this.http.get<JsonResponseInterfaces<CivilStatusInterface[]>>(`${environment.API_Url}civilStatus`);
  }
  getEducationLevels() : Observable<JsonResponseInterfaces<EducationLevelInterface[]>>{
    return this.http.get<JsonResponseInterfaces<EducationLevelInterface[]>>(`${environment.API_Url}educationLevel`);
  }
  getHeadquarters() : Observable<JsonResponseInterfaces<HeadquarterInterface[]>>{
    return this.http.get<JsonResponseInterfaces<HeadquarterInterface[]>>(`${environment.API_Url}headquarter`);
  }
  getPensionFunds() : Observable<JsonResponseInterfaces<PensionFundInterface[]>>{
    return this.http.get<JsonResponseInterfaces<PensionFundInterface[]>>(`${environment.API_Url}pensionFund`);
  }
  getHealthProviders() : Observable<JsonResponseInterfaces<HealthProviderInterface[]>>{
    return this.http.get<JsonResponseInterfaces<HealthProviderInterface[]>>(`${environment.API_Url}healthProvider`);
  }
  getContractTypes() : Observable<JsonResponseInterfaces<ContractTypeInterface[]>>{
    return this.http.get<JsonResponseInterfaces<ContractTypeInterface[]>>(`${environment.API_Url}contractType`);
  }
  getPositions() : Observable<JsonResponseInterfaces<PositionInterfaces[]>>{
    return this.http.get<JsonResponseInterfaces<PositionInterfaces[]>>(`${environment.API_Url}position`);
  }
  getKinkships() : Observable<JsonResponseInterfaces<KinkshipInterface[]>>{
    return this.http.get<JsonResponseInterfaces<KinkshipInterface[]>>(`${environment.API_Url}kinship`);
  }
  getSalaryTypes(): Observable<JsonResponseInterfaces<SalaryTypeInterface[]>>{
    return this.http.get<JsonResponseInterfaces<SalaryTypeInterface[]>>(`${environment.API_Url}salaryType`);
  }
  getBusinessLines(): Observable<JsonResponseInterfaces<BusinessLineInterface[]>>{
    return this.http.get<JsonResponseInterfaces<BusinessLineInterface[]>>(`${environment.API_Url}businessLine`);
  }
  getOcupationalRiskManager() : Observable<JsonResponseInterfaces<ocupationalRiskManagerInterface[]>>{
    return this.http.get<JsonResponseInterfaces<ocupationalRiskManagerInterface[]>>(`${environment.API_Url}ocupationalRiskManager`);
  }
  getProvinces() : Observable<JsonResponseInterfaces<ProvinceInterface[]>>{
    return this.http.get<JsonResponseInterfaces<ProvinceInterface[]>>(`${environment.API_Url}province`);
  }
}
