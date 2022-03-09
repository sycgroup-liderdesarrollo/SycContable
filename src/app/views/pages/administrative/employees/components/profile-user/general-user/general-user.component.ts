import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeInterface } from '../../../interfaces/employee-interface';
import { IdentificationTypeInterface } from '../../../interfaces/identification-type-interface';
import { EmployeesService } from '../../../services/service-employees.service';
import { UsersService } from '../../../services/services-users.service';

@Component({
  selector: 'app-general-user',
  templateUrl: './general-user.component.html',
  styleUrls: ['./general-user.component.scss']
})
export class GeneralUserComponent implements OnInit {

  @Input() user_id: number;

  user_data:EmployeeInterface;
  form: FormGroup
  identificationTypes: IdentificationTypeInterface[];

  isEdit:boolean = false;
  name:string = "Jhonata gamboa";
  cumple:Date = new Date("16-02-2022");
  number:number = 3
  btnEdit:string;

  constructor(
    private serviceUser: EmployeesService,
    private serviceUserData: UsersService,

    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.getUser();
    this.Init();
  }

  makeForm(user_data: any){
    this.form = this.fb.group({
      name:                   [user_data?.name ?? ''],
      last_name:              [user_data?.last_name ?? ''],
      identification_number:  [user_data?.identification_number ??''],
      identification_type_id: [user_data?.identificationType.id ??''],
      expedition_place_id:    [user_data?.expedition_place_id ??''],
      gender_id:              [user_data?.gender_id ??''],
      civil_status_id:        [user_data?.civil_status_id ??''],
      birthday:               [user_data?.birthday ??''],
      children:               [user_data?.children ??''],
      phone:                  [user_data?.phone ??''],
      image:                  [user_data?.image ??''],
      address:                [user_data?.address ??''],
      neighborhood:           [user_data?.neighborhood ??''],
      strata_id:              [user_data?.strata_id ??''],
      residence_city_id:      [user_data?.residence_city_id ??''],
      education_level_id:     [user_data?.education_level_id ??''],
    })
  }
  async Init(){
    this.getIndentificationTypes();
  }
  edit(){
    this.isEdit = !this.isEdit;
    this.isEdit == true ? this.btnEdit = "active" : this.btnEdit = " ";
  }
  getUser(){
    this.serviceUser.getUser(this.user_id).subscribe(resp => {
      this.user_data = resp.data;
      this.makeForm(this.user_data)
    })
  }
  getIndentificationTypes(){
    this.serviceUserData.getIdentificationTypes().subscribe(resp => {
      this.identificationTypes = resp.data;
    })
  }
}
