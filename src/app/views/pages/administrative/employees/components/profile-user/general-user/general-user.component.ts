import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CityInterface } from '../../../interfaces/city-interface';
import { CivilStatusInterface } from '../../../interfaces/civil-status-interface';
import { EducationLevelInterface } from '../../../interfaces/education-level-interface';
import { EmployeeInterface } from '../../../interfaces/employee-interface';
import { GenderInterface } from '../../../interfaces/gender-interface';
import { IdentificationTypeInterface } from '../../../interfaces/identification-type-interface';
import { ProvinceInterface } from '../../../interfaces/province-interface';
import { StrataInterface } from '../../../interfaces/strata-interface';
import { EmployeesService } from '../../../services/service-employees.service';
import { UsersService } from '../../../services/services-users.service';

@Component({
  selector: 'app-general-user',
  templateUrl: './general-user.component.html',
  styleUrls: ['./general-user.component.scss']
})
export class GeneralUserComponent implements OnInit {

  @Input() user_id: number;
  @Output() refresh_page = new EventEmitter();

  form: FormGroup
  btnEdit: string;
  isLoading: boolean;
  isEdit: boolean = false;
  strata: StrataInterface[];
  genders: GenderInterface[];
  user_data:EmployeeInterface;
  provinces: ProvinceInterface[];
  messaggeAlert: boolean = false;
  citiesResidence: CityInterface[];
  citiesExpedition: CityInterface[];
  civilStatus: CivilStatusInterface[];
  educationLevels: EducationLevelInterface[];
  identificationTypes: IdentificationTypeInterface[];


  constructor(
    private serviceUser: EmployeesService,
    private serviceUserData: UsersService,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {this.isLoading = false;}, 3000);
    this.getUser();
    this.Init();
  }
  makeForm(user_data: any){
    this.form = this.fb.group({
      name:                   [user_data?.name ?? '', [Validators.required, Validators.minLength(3)]],
      last_name:              [user_data?.last_name ?? '', [Validators.required, Validators.minLength(3)]],
      identification_number:  [user_data?.identification_number ?? '', Validators.required],
      identification_type_id: [user_data?.identificationType.id ?? '', Validators.required],
      expedition_place_id:    [user_data?.expeditionPlace.id ?? '', Validators.required],
      province_expedition:    [user_data?.expeditionPlace.province.id ?? ''],
      gender_id:              [user_data?.gender.id ?? '', Validators.required],
      civil_status_id:        [user_data?.civilStatus.id ?? '', Validators.required],
      birthday:               [user_data?.birthday ?? '', Validators.required],
      children:               [user_data?.children ?? '', Validators.required],
      phone:                  [user_data?.phone ?? '', [Validators.required, Validators.pattern("[0-9]{10,10}")]],
      province_address:       [user_data?.residenceCity.province.id ?? ''],
      address:                [user_data?.address ?? '', Validators.required],
      neighborhood:           [user_data?.neighborhood ?? '', Validators.required],
      strata_id:              [user_data?.strata.id ?? '', Validators.required],
      residence_city_id:      [user_data?.residenceCity.id ?? '', Validators.required],
      education_level_id:     [user_data?.educationLevel.id ?? '', Validators.required],
    })
  }
  async Init(){
    this.getIndentificationTypes();
    this.getProvinces();
    this.getGenders();
    this.getCivilStatus();
    this.getEducationLevels();
    this.getStrata();
  }
  edit(){
    this.isEdit = !this.isEdit;
    this.isEdit == true ? this.btnEdit = "active" : this.btnEdit = " ";
  }
  getUser(){
    this.serviceUser.getUser(this.user_id).subscribe(resp => {
      this.user_data = resp.data;
      this.makeForm(this.user_data)
      this.getCitiesExpedition(this.user_data.expeditionPlace.province.id);
      this.getCitiesRecidence(this.user_data.residenceCity.province.id);
    })
  }
  getIndentificationTypes(){
    this.serviceUserData.getIdentificationTypes().subscribe(resp => {
      this.identificationTypes = resp.data;
    })
  }
  getCitiesRecidence(province_id?:number){
    this.serviceUserData.getCities(province_id).subscribe(resp =>{
      this.citiesResidence = resp.data;
    })
  }
  getCitiesExpedition(province_id?:number){
    this.serviceUserData.getCities(province_id).subscribe(resp =>{
      this.citiesExpedition = resp.data;
    })
  }
  getProvinces(){
    this.serviceUserData.getProvinces().subscribe(resp =>{
      this.provinces = resp.data
    })
  }
  filterCitiesExpedition(e: any){
    this.getCitiesExpedition(e.target.value)
  }
  filterCitiesRecidence(e: any){
    this.getCitiesRecidence(e.target.value)
  }
  getGenders(){
    this.serviceUserData.getGenders().subscribe(resp => {
      this.genders = resp.data
    })
  }
  getCivilStatus(){
    this.serviceUserData.getCivilStatus().subscribe(resp => {
      this.civilStatus = resp.data;
    })
  }
  getEducationLevels(){
    this.serviceUserData.getEducationLevels().subscribe(resp => {
      this.educationLevels = resp.data
    })
  }
  getStrata(){
    this.serviceUserData.getStrata().subscribe(resp => {
      this.strata = resp.data
    })
  }
  putUser(form: any){
    this.messaggeAlert = true;
    this.serviceUser.putUser(this.user_id, form).subscribe(()=>{
      this.edit()
      this.refresh_page.emit();
      setTimeout(() => {this.messaggeAlert = false;}, 2000);
    })
  }
}
