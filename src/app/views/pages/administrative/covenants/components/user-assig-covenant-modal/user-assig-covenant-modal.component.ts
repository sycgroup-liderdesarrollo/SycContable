import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceEmployeesService } from '../../../employees/services/service-employees.service';
import { EmployeeInterface } from '../../../interfaces/employee-interface';

@Component({
  selector: 'app-user-assig-covenant-modal',
  templateUrl: './user-assig-covenant-modal.component.html',
  styleUrls: ['./user-assig-covenant-modal.component.scss']
})
export class UserAssigCovenantModalComponent implements OnInit {

  @Input() covenantData:any;
  @Output() user_covenant = new EventEmitter();

  employees:EmployeeInterface[];
  form:FormGroup;
  user_id:number;
  isSelected:boolean = false;
  employe_name:string;
  alertSuccess:boolean = false;
  message:any = "";
  isPermanent:boolean = false;
  alertType:string="";

  constructor(
    private serviceUser: ServiceEmployeesService,
    public modal:NgbModal,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.makeForm();
    this.getEmployees();
    this.covenantData.covenantType.id == 2 ? this.isPermanent = true : this.isPermanent = false;
  }
  makeForm(){
    this.form = this.fb.group({
      covenant_id: [this.covenantData.id ?? ''],
      dues:  ['', Validators.required],
      value: ['', Validators.required]
    })
  }
  getEmployees(){
    this.serviceUser.getEmployed().subscribe(resp => {
      this.employees = resp.data;
    })
  }
  userFilter(event:any){
    this.serviceUser.getEmployed(event.target.value).subscribe(resp => {
      this.employees = resp.data
    })
  }
  selectUser(user_id:number){
    this.user_id = user_id;
    this.employe_name = this.employees[user_id - 1].name;
    if (this.covenantData.covenantType.id == 2) {
      this.isSelected = true;
      this.alertSuccess = true;
      this.assignCovenant(this.form.value);
    }else{
      this.isSelected = true;
    }
  }
  assignCovenant(formData:any){
    this.serviceUser.assignCovenant(this.user_id, formData).subscribe(resp => {
      this.message = resp;
      this.message.warning == 1 ? this.alertType = "warning" : this.alertType = "success"
      this.alertSuccess = true
      setTimeout(()=>{this.modal.dismissAll()}, 5000);
      this.user_covenant.emit();
    });
  }
  back(){
    this.isSelected = false;
    this.form.reset();
    this.makeForm();
  }
}
