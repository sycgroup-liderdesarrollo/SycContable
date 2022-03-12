import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscriber } from 'rxjs';
import { BusinessLineInterface } from '../../interfaces/business-line-interfaces';
import { CityInterface } from '../../interfaces/city-interface';
import { CivilStatusInterface } from '../../interfaces/civil-status-interface';
import { ContractTypeInterface } from '../../interfaces/contract-type-interface';
import { EducationLevelInterface } from '../../interfaces/education-level-interface';
import { EmergencyContactInterface } from '../../interfaces/emergency-contact-interface';
import { EmployeeInterface } from '../../interfaces/employee-interface';
import { GenderInterface } from '../../interfaces/gender-interface';
import { HeadquarterInterface } from '../../interfaces/headquarter-interface';
import { HealthProviderInterface } from '../../interfaces/health-provider-interface';
import { IdentificationTypeInterface } from '../../interfaces/identification-type-interface';
import { KinkshipInterface } from '../../interfaces/kinkship-interface';
import { ocupationalRiskManagerInterface } from '../../interfaces/ocupational-risk-manager-interface';
import { PensionFundInterface } from '../../interfaces/pension-fund-interface';
import { PositionInterfaces } from '../../interfaces/position-interfaces';
import { ProvinceInterface } from '../../interfaces/province-interface';
import { SalaryTypeInterface } from '../../interfaces/salary-type-interface';
import { StrataInterface } from '../../interfaces/strata-interface';
import { EmergencyContactService } from '../../services/service-emergency-contact.service';
import { EmployeesService } from '../../services/service-employees.service';
import { UsersService } from '../../services/services-users.service';

@Component({
  selector: 'app-modal-add-employees',
  templateUrl: './modal-add-employees.component.html',
  styleUrls: ['./modal-add-employees.component.scss']
})
export class ModalAddEmployeesComponent implements OnInit {

  @Output() refresh_users = new EventEmitter();

  form: FormGroup;
  actualImage:any;
  message:any = "";
  isLoading: boolean;
  pagine: number = 1;
  alertType:string="";
  formContact: FormGroup;
  cities: CityInterface[];
  isEdit: boolean = false;
  strata: StrataInterface[];
  genders: GenderInterface[];
  changeImage:boolean = false;
  emergency_contact_id: number;
  messaggeAlert:boolean = false;
  provinces: ProvinceInterface[];
  kinkships: KinkshipInterface[];
  positions: PositionInterfaces[];
  salaryTypes: SalaryTypeInterface[];
  civilStatus: CivilStatusInterface[];
  headquarters: HeadquarterInterface[];
  pensionFunds: PensionFundInterface[];
  businessLines: BusinessLineInterface[];
  contractTypes: ContractTypeInterface[];
  healthProviders: HealthProviderInterface[];
  educationLevels: EducationLevelInterface[];
  identificationTypes: IdentificationTypeInterface[];
  ocupationalRiskManagers: ocupationalRiskManagerInterface[];

  constructor(
    private serviceEmployees: EmployeesService,
    private serviceEmergencyContact: EmergencyContactService,
    private serviceUser: UsersService,
    private fb: FormBuilder,
    public modal: NgbModal
  ) { }
  ngOnInit(): void {
    this.init();
    this.isLoading = true
    setTimeout(() => {this.isLoading = false}, 4000);
  }
  async init(){
    this.getProvicens();
    this.getCities();
    this.getIndentificationTypes();
    this.getStrata();
    this.getGenders();
    this.getCivilStatus();
    this.getEdutacionLevel()
    this.getHeadquarter();
    this.getPensionFunds();
    this.getHealthProviders();
    this.getContractTypes();
    this.getPositions();
    this.getKinkships();
    this.getSalaryTypes();
    this.getBusinessLines();
    this.getOcupationalRiskManager();
    this.makeForm();
    this.makeContactForm();
  }
  makeForm(){
    this.form = this.fb.group({
      name:                         ['', [Validators.required, Validators.minLength(3)]],
      last_name:                    ['', [Validators.required, Validators.minLength(3)]],
      identification_number:        ['', Validators.required],
      expedition_place_id:          ['', Validators.required],
      identification_type_id:       ['', Validators.required],
      birthday:                     ['', Validators.required],
      phone:                        ['', [Validators.required, Validators.pattern("[0-9]{10,10}")]],
      children:                     ['', Validators.required],
      address:                      ['', Validators.required],
      neighborhood:                 ['', Validators.required],
      strata_id:                    ['', Validators.required],
      residence_city_id:            ['', Validators.required],
      gender_id:                    ['', Validators.required],
      civil_status_id:              ['', Validators.required],
      education_level_id:           ['', Validators.required],
      headquarter_id:               ['', Validators.required],
      work_city_id:                 ['', Validators.required],
      pension_fund_id:              ['', Validators.required],
      health_provider_id:           ['', Validators.required],
      contract_type_id:             ['', Validators.required],
      base_salary:                  ['', Validators.required],
      salary_type_id:               ['', Validators.required],
      position_id:                  ['', Validators.required],
      admission_date:               ['', Validators.required],
      out_date:                     ['', Validators.required],
      active:                       ['1'],
      occupational_risk_manager_id: ['', Validators.required],
      business_line_id:             ['', Validators.required],
      email:                        ['', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}")]],
      password:                     ['', [Validators.required, Validators.minLength(8)]],
      image:                        ['', Validators.required],
      emergency_contact_id:         ['', Validators.required],
    })
    this.isLoading = false;
  }
  makeContactForm(){
    this.formContact = this.fb.group({
      name:       ['', [Validators.required, Validators.minLength(3)]],
      phone:      ['', [Validators.required, Validators.pattern("[0-9]{10,10}")]],
      kinship_id: ['', Validators.required]
    })
  }
  postUser(form:any){
    this.messaggeAlert = true;
    setTimeout(() => {
      form.image = this.actualImage;
      form.emergency_contact_id = this.emergency_contact_id;
      console.log(form);

      this.serviceEmployees.postUser(form).subscribe()
      this.modal.dismissAll();
      this.refresh_users.emit();
    }, 1500);
  }
  postEmergencyContact(form:any){
    this.serviceEmergencyContact.postEmergencyContact(form).subscribe(resp =>{
      this.emergency_contact_id = resp.data.id;
    })
  }
  changePagine(){
    this.pagine < 6 ? this.pagine ++ : false;
  }
  back(){
    this.pagine <= 6 ? this.pagine -- : false;
  }
  getCities(province_id?:number){
    this.serviceUser.getCities(province_id).subscribe(resp =>{
      this.cities = resp.data;
    })
  }
  getIndentificationTypes(){
    this.serviceUser.getIdentificationTypes().subscribe(resp => {
      this.identificationTypes = resp.data;
    })
  }
  getStrata(){
    this.serviceUser.getStrata().subscribe(resp => {
      this.strata = resp.data;
    })
  }
  getGenders(){
    this.serviceUser.getGenders().subscribe(resp => {
      this.genders = resp.data;
    })
  }
  getCivilStatus(){
    this.serviceUser.getCivilStatus().subscribe(resp => {
      this.civilStatus = resp.data;
    })
  }
  getEdutacionLevel(){
    this.serviceUser.getEducationLevels().subscribe(resp => {
      this.educationLevels = resp.data;
    })
  }
  getHeadquarter(){
    this.serviceUser.getHeadquarters().subscribe(resp => {
      this.headquarters = resp.data;
    })
  }
  getPensionFunds(){
    this.serviceUser.getPensionFunds().subscribe(resp => {
      this.pensionFunds = resp.data;
    })
  }
  getHealthProviders(){
    this.serviceUser.getHealthProviders().subscribe(resp => {
      this.healthProviders = resp.data;
    })
  }
  getContractTypes(){
    this.serviceUser.getContractTypes().subscribe(resp => {
      this.contractTypes = resp.data;
    })
  }
  getPositions(){
    this.serviceUser.getPositions().subscribe(resp =>{
      this.positions = resp.data
    })
  }
  getKinkships(){
    this.serviceUser.getKinkships().subscribe(resp => {
      this.kinkships = resp.data
    })
  }
  getSalaryTypes(){
    this.serviceUser.getSalaryTypes().subscribe(resp =>{
      this.salaryTypes = resp.data;
    })
  }
  getBusinessLines(){
    this.serviceUser.getBusinessLines().subscribe(resp =>{
      this.businessLines = resp.data
    })
  }
  getOcupationalRiskManager(){
    this.serviceUser.getOcupationalRiskManager().subscribe(resp =>{
      this.ocupationalRiskManagers = resp.data;
    })
  }
  getProvicens(){
    this.serviceUser.getProvinces().subscribe(resp =>{
      this.provinces = resp.data
    })
  }
  filterCities(e: any){
    this.getCities(e.target.value)
  }
  cacthImage(event:any){
    const covenantImage = event.target.files[0]
    this.convertToBase64(covenantImage)
    this.changeImage = true;
  }
  convertToBase64(file:File){
    const observable = new Observable((suscriber:Subscriber<any>)=>{
      this.readFile(file, suscriber);
    });
    observable.subscribe((d)=>{
      this.actualImage = d;
    })
  }
  readFile(file:File, suscriber:Subscriber<any>){
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file)
    fileReader.onload = ()=>{
      suscriber.next(fileReader.result)
      suscriber.complete();
    }
    fileReader.onerror = (error)=>{
      suscriber.error(error)
      suscriber.complete();
    }
  }
}
