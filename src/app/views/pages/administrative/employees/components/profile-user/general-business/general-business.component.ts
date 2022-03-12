import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityInterface } from '../../../interfaces/city-interface';
import { ContractTypeInterface } from '../../../interfaces/contract-type-interface';
import { EmployeeInterface } from '../../../interfaces/employee-interface';
import { HeadquarterInterface } from '../../../interfaces/headquarter-interface';
import { HealthProviderInterface } from '../../../interfaces/health-provider-interface';
import { ocupationalRiskManagerInterface } from '../../../interfaces/ocupational-risk-manager-interface';
import { PensionFundInterface } from '../../../interfaces/pension-fund-interface';
import { PositionInterfaces } from '../../../interfaces/position-interfaces';
import { ProvinceInterface } from '../../../interfaces/province-interface';
import { SalaryTypeInterface } from '../../../interfaces/salary-type-interface';
import { EmployeesService } from '../../../services/service-employees.service';
import { UsersService } from '../../../services/services-users.service';

@Component({
  selector: 'app-general-business',
  templateUrl: './general-business.component.html',
  styleUrls: ['./general-business.component.scss']
})
export class GeneralBusinessComponent implements OnInit {

  @Input() user_id: number;
  @Output() refresh_page = new EventEmitter();

  btnEdit:string;
  form:FormGroup;
  isLoading: boolean;
  isEdit:boolean = false;
  citiesWork: CityInterface[];
  user_data: EmployeeInterface;
  messaggeAlert: boolean = false;
  positions: PositionInterfaces[];
  provicesWork: ProvinceInterface[];
  salaryTypes: SalaryTypeInterface[];
  headquarters: HeadquarterInterface[];
  pensionFunds: PensionFundInterface[];
  contractTypes: ContractTypeInterface[];
  healthProviders: HealthProviderInterface[];
  ocupationalRiskManagers: ocupationalRiskManagerInterface[];

  constructor(
    private fb:FormBuilder,
    private serviceUser: EmployeesService,
    private serviceUserData: UsersService,
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {this.isLoading = false;}, 3000);
    this.getUser();
    this.Init();
  }

  makeForm(user_data: any){
    this.form = this.fb.group({
      province_work:                [user_data?.work_city.province.id ?? ''],
      work_city_id:                 [user_data?.work_city.id ?? ''],
      headquarter_id:               [user_data?.headquarter.id ?? ''],
      position_id:                  [user_data?.position.id ?? ''],
      base_salary:                  [user_data?.base_salary ?? '', Validators.required],
      salary_type_id:               [user_data?.salaryType.id ?? ''],
      admission_date:               [user_data?.admission_date ?? '', Validators.required],
      out_date:                     [user_data?.out_date ?? ''],
      contract_type_id:             [user_data?.contractType.id ?? ''],
      health_provider_id:           [user_data?.healthProvider.id ?? ''],
      pension_fund_id:              [user_data?.pensionFund.id ?? ''],
      occupational_risk_manager_id: [user_data?.occupationalRiskManager.id ?? ''],
      active:                       [user_data?.active ?? '']
    })
  }

  async Init(){
    this.getProvinceWork();
    this.getHeadquarters();
    this.getPositions();
    this.getSalaryTypes();
    this.getContractTypes();
    this.getHealthProviders();
    this.getPensionFunds();
    this.getOcupationalRiskManagers()
  }

  edit(){
    this.isEdit = !this.isEdit;
    this.isEdit == true ? this.btnEdit = "active" : this.btnEdit = " ";
  }
  getUser(){
    this.serviceUser.getUser(this.user_id).subscribe(resp => {
      this.user_data = resp.data;
      this.makeForm(this.user_data);
      this.getCitiesWork(this.user_data.work_city.province.id)

    })
  }
  getProvinceWork(){
    this.serviceUserData.getProvinces().subscribe(resp =>{
      this.provicesWork = resp.data
    })
  }
  getCitiesWork(province_id?: number){
    this.serviceUserData.getCities(province_id).subscribe(resp =>{
      this.citiesWork = resp.data;
    })
  }
  filterCitiesWork(e:any){
    this.getCitiesWork(e.target.value)
  }
  getHeadquarters(){
    this.serviceUserData.getHeadquarters().subscribe(resp => {
      this.headquarters = resp.data
    })
  }
  getPositions(){
    this.serviceUserData.getPositions().subscribe(resp => {
      this.positions = resp.data;
    })
  }
  getSalaryTypes(){
    this.serviceUserData.getSalaryTypes().subscribe(resp => {
      this.salaryTypes = resp.data;
    })
  }
  getContractTypes(){
    this.serviceUserData.getContractTypes().subscribe(resp => {
      this.contractTypes = resp.data;
    })
  }
  getHealthProviders(){
    this.serviceUserData.getHealthProviders().subscribe(resp => {
      this.healthProviders = resp.data;
    })
  }
  getPensionFunds(){
    this.serviceUserData.getPensionFunds().subscribe(resp => {
      this.pensionFunds = resp.data
    })
  }
  getOcupationalRiskManagers(){
    this.serviceUserData.getOcupationalRiskManager().subscribe(resp => {
      this.ocupationalRiskManagers = resp.data;
    })
  }
  putBusinessUser(form: any){
    this.messaggeAlert = true;
    this.serviceUser.putUser(this.user_id, form).subscribe(() =>{
      this.edit();
      this.refresh_page.emit();
      setTimeout(() => {this.messaggeAlert = false;}, 2000);
    })
  }
}
