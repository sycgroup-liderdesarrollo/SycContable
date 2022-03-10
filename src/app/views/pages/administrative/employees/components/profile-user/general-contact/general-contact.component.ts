import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeInterface } from '../../../interfaces/employee-interface';
import { KinkshipInterface } from '../../../interfaces/kinkship-interface';
import { EmergencyContactService } from '../../../services/service-emergency-contact.service';
import { EmployeesService } from '../../../services/service-employees.service';
import { UsersService } from '../../../services/services-users.service';

@Component({
  selector: 'app-general-contact',
  templateUrl: './general-contact.component.html',
  styleUrls: ['./general-contact.component.scss']
})
export class GeneralContactComponent implements OnInit {

  @Input() user_id: number;
  @Output() refresh_page = new EventEmitter();

  btnEdit:string;
  form: FormGroup;
  isLoading: boolean;
  isEdit:boolean = false;
  user_data: EmployeeInterface;
  kinships: KinkshipInterface[];
  messaggeAlert: boolean = false;


  constructor(
    private fb: FormBuilder,
    private serviceUserData: UsersService,
    private serviceUser: EmployeesService,
    private serviceContact: EmergencyContactService
  ) { }


  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {this.isLoading = false;}, 3000);

    this.getKinships();
    this.getUser();
  }

  makeForm(user_data?:any){
    this.form = this.fb.group({
      name: [user_data?.emergencyContact.name ?? ''],
      phone:  [user_data?.emergencyContact.phone ?? ''],
      kinship_id: [user_data?.emergencyContact.kinship.id ?? '']
    })
  }

  getUser(){
    this.serviceUser.getUser(this.user_id).subscribe(resp => {
      this.user_data = resp.data
      console.log(this.user_data);

      this.makeForm(this.user_data);
    })
  }

  edit(){
    this.isEdit = !this.isEdit;
    this.isEdit == true ? this.btnEdit = "active" : this.btnEdit = " ";
  }

  getKinships(){
    this.serviceUserData.getKinkships().subscribe(resp =>{
      this.kinships = resp.data
    })
  }
  putContact(form: any){
    this.messaggeAlert = true;
    this.serviceContact.putEmergencyContact(this.user_data.emergencyContact.id, form).subscribe(()=>{
      this.edit()
      this.refresh_page.emit();
      setTimeout(() => {this.messaggeAlert = false;}, 2000);
    });
  }
}
