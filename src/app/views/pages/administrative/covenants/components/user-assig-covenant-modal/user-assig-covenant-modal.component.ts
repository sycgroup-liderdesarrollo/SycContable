import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ServiceEmployeesService } from '../../../employees/services/service-employees.service';

@Component({
  selector: 'app-user-assig-covenant-modal',
  templateUrl: './user-assig-covenant-modal.component.html',
  styleUrls: ['./user-assig-covenant-modal.component.scss']
})
export class UserAssigCovenantModalComponent implements OnInit {

  @Input() covenantData:any;

  employees:any;
  form:FormGroup;
  user_id:number;
  isSelected:boolean = false;
  employe_name:string;
  alertSuccess:boolean = false;
  message:any = "";
  isPermanent:boolean = false;

  constructor(
    private serviceUser: ServiceEmployeesService,
    public modal:NgbModal,
    private fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.makeForm();
    this.getEmployees();
    this.covenantData.covenantType.id == 2 ? this.isPermanent = true : 0;
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
    console.log(this.form.value);

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
      this.alertSuccess = true
      setTimeout(()=>{window.location.reload();}, 3000);
    });
  }
  back(){
    this.isSelected = false;
    this.employe_name = "";
    this.user_id = 0;
    this.form.reset();
    this.makeForm();
  }
}
