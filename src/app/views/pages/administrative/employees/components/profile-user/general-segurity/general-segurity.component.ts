import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { EmployeeInterface } from '../../../interfaces/employee-interface';
import { EmployeesService } from '../../../services/service-employees.service';

@Component({
  selector: 'app-general-segurity',
  templateUrl: './general-segurity.component.html',
  styleUrls: ['./general-segurity.component.scss']
})
export class GeneralSegurityComponent implements OnInit {

  @Input() user_id: number;
  @Output() refresh_page = new EventEmitter();

  btnEdit:string;
  form: FormGroup;
  isLoading: boolean;
  isEdit:boolean = false;
  user_data: EmployeeInterface;
  messaggeAlert: boolean = false;

  constructor(
    private fb: FormBuilder,
    private serviceUser: EmployeesService
  ) { }

  makeForm(user_data?: any){
    this.form = this.fb.group({
      email:  [user_data?.email ?? ''],
    })
  }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {this.isLoading = false;}, 3000);
    this.getUser();
  }
  edit(){
    this.isEdit = !this.isEdit;
    this.isEdit == true ? this.btnEdit = "active" : this.btnEdit = " ";
  }
  getUser(){
    this.serviceUser.getUser(this.user_id).subscribe(resp => {
      this.user_data = resp.data
      this.makeForm(this.user_data);
    })
  }
  putSegurityUser(form:any){
    this.messaggeAlert = true;
    this.serviceUser.putUser(this.user_id, form).subscribe(()=>{
      this.edit()
      this.refresh_page.emit();
      setTimeout(() => {this.messaggeAlert = false;}, 2000);

    })
  }
}
