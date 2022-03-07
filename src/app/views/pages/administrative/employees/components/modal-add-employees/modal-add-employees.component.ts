import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CityInterface } from '../../interfaces/city-interface';
import { CivilStatusInterface } from '../../interfaces/civil-status-interface';
import { ContractTypeInterface } from '../../interfaces/contract-type-interface';
import { EducationLevelInterface } from '../../interfaces/education-level-interface';
import { EmployeeInterface } from '../../interfaces/employee-interface';
import { GenderInterface } from '../../interfaces/gender-interface';
import { HeadquarterInterface } from '../../interfaces/headquarter-interface';
import { HealthProviderInterface } from '../../interfaces/health-provider-interface';
import { IdentificationTypeInterface } from '../../interfaces/identification-type-interface';
import { KinkshipInterface } from '../../interfaces/kinkship-interface';
import { PensionFundInterface } from '../../interfaces/pension-fund-interface';
import { PositionInterfaces } from '../../interfaces/position-interfaces';
import { SalaryTypeInterface } from '../../interfaces/salary-type-interface';
import { StrataInterface } from '../../interfaces/strata-interface';
import { EmployeesService } from '../../services/service-employees.service';
import { UsersService } from '../../services/services-users.service';

@Component({
  selector: 'app-modal-add-employees',
  templateUrl: './modal-add-employees.component.html',
  styleUrls: ['./modal-add-employees.component.scss']
})
export class ModalAddEmployeesComponent implements OnInit {

  form: FormGroup;
  pagine: number = 1;
  cities: CityInterface[];
  strata: StrataInterface[];
  genders: GenderInterface[];
  kinkships: KinkshipInterface[];
  positions: PositionInterfaces[];
  salaryType: SalaryTypeInterface[];
  civilStatus: CivilStatusInterface[];
  headquarters: HeadquarterInterface[];
  pensionFunds: PensionFundInterface[];
  contractTypes: ContractTypeInterface[];
  healthProviders: HealthProviderInterface[];
  educationLevels: EducationLevelInterface[];
  identificationTypes: IdentificationTypeInterface[];

  constructor(
    private serviceEmployees: EmployeesService,
    private userService: UsersService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init(){
    await this.getCities();
    await this.getIndentificationTypes();
    await this.getStrata();
    await this.getGenders();
    await this.getCivilStatus();
    await this.getEdutacionLevel()
    await this.getHeadquarter();
    await this.getPensionFunds();
    await this.getHealthProviders();
    await this.getContractTypes();
    await this.getPositions();
    await this.getKinkships();
  }

  makeForm(userData?: EmployeeInterface){
    this.form = this.fb.group({
      name:                           ['', Validators.required],
      last_name:                      ['', Validators.required],
      identification_number:          ['', Validators.required],
      expedition_place_id:            ['', Validators.required],
      identification_type_id:         ['', Validators.required],
      birthday:                       ['', Validators.required],
      phone:                          ['', Validators.required],
      children:                       ['', Validators.required],
      address:                        ['', Validators.required],
      neighborhood:                   ['', Validators.required],
      strata_id:                      ['', Validators.required],
      residence_city_id:              ['', Validators.required],
      gender_id:                      ['', Validators.required],
      civil_statu_id:                 ['', Validators.required],
      education_level_id:             ['', Validators.required],
      headquarter_id:                 ['', Validators.required],
      work_city_id:                   ['', Validators.required],
      health_provider_id:             ['', Validators.required],
      pension_fund_id:                ['', Validators.required],
      contract_type_id:               ['', Validators.required],
      position_id:                    ['', Validators.required],
      admission_date:                 ['', Validators.required],
      out_date:                       ['', Validators.required],
      base_salary:                    ['', Validators.required],
      salary_type_id:                 ['', Validators.required],
      email:                          ['', Validators.required],
      password:                       ['', Validators.required],
      active:                         ['', Validators.required],
      emergency_contact_id:           ['', Validators.required],
      occupational_risk_manager_id:   ['', Validators.required],
      business_line_id:               ['', Validators.required],
    })
  }

  changePagine(){
    this.pagine < 5 ? this.pagine ++ : false;
  }
  back(){
    this.pagine <= 5 ? this.pagine -- : false;
  }

  getCities(){
    this.userService.getCities().subscribe(resp =>{
      this.cities = resp.data;
    })
  }
  getIndentificationTypes(){
    this.userService.getIdentificationTypes().subscribe(resp => {
      this.identificationTypes = resp.data;
    })
  }
  getStrata(){
    this.userService.getStrata().subscribe(resp => {
      this.strata = resp.data;
    })
  }
  getGenders(){
    this.userService.getGenders().subscribe(resp => {
      this.genders = resp.data;
    })
  }
  getCivilStatus(){
    this.userService.getCivilStatus().subscribe(resp => {
      this.civilStatus = resp.data;
    })
  }
  getEdutacionLevel(){
    this.userService.getEducationLevels().subscribe(resp => {
      this.educationLevels = resp.data;
    })
  }
  getHeadquarter(){
    this.userService.getHeadquarters().subscribe(resp => {
      this.headquarters = resp.data;
    })
  }
  getPensionFunds(){
    this.userService.getPensionFunds().subscribe(resp => {
      this.pensionFunds = resp.data;
    })
  }
  getHealthProviders(){
    this.userService.getHealthProviders().subscribe(resp => {
      this.healthProviders = resp.data;
    })
  }
  getContractTypes(){
    this.userService.getContractTypes().subscribe(resp => {
      this.contractTypes = resp.data;
    })
  }
  getPositions(){
    this.userService.getPositions().subscribe(resp =>{
      this.positions = resp.data
    })
  }
  getKinkships(){
    this.userService.getKinkships().subscribe(resp => {
      this.kinkships = resp.data
    })
  }
  getSalaryType(){
    this.userService.getSalaryType().subscribe(resp =>{
      this.salaryType = resp.data;
    })
  }
}
