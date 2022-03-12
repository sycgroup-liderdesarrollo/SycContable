import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  btnEdit: string;
  form: FormGroup;
  isLoading: boolean;
  actualPassword: string;
  formPassword: FormGroup;
  isEdit: boolean = false;
  user_data: EmployeeInterface;
  messaggeAlert: boolean = false;
  isValidPassword: boolean = true;
  messagePassword: boolean = false;

  constructor(
    private fb: FormBuilder,
    private serviceUser: EmployeesService
  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    setTimeout(() => {this.isLoading = false;}, 3000);
    this.getUser();
    this.makePasswordForm();
  }
  makeForm(user_data?: any){
    this.form = this.fb.group({
      email:  [user_data?.email ?? '', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}")]],
    })
  }
  makePasswordForm(){
    this.formPassword = this.fb.group({
      password:     ['', [Validators.required, Validators.minLength(8)]],
      passwordNull: ['', [Validators.required, Validators.minLength(8)]]
    })
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
  verifyPassword(e:any, inp_id:number){
    if (inp_id == 1) {
      this.actualPassword = e.target.value
    }else{
      if(e.target.value == this.actualPassword){
        this.isValidPassword = true;
      }else{
        this.isValidPassword = false;
      }
    }
  }
  savePassword(form: any){
    if (this.isValidPassword == true) {
      this.serviceUser.putUser(this.user_id, form).subscribe(()=>{
        this.messagePassword = true

      });
    }
  }


}
