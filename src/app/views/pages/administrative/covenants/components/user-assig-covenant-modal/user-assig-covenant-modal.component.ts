import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeInterface } from '../../../employees/interfaces/employee-interface';
import { EmployeesService } from '../../../employees/services/service-employees.service';
import { CovenantInterface } from '../../interfaces/covenants-interface';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-assig-covenant-modal',
  templateUrl: './user-assig-covenant-modal.component.html',
  styleUrls: ['./user-assig-covenant-modal.component.scss']
})
export class UserAssigCovenantModalComponent implements OnInit {

  @Input() covenantData:CovenantInterface;
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
  employeeImage:string;

  constructor(
    private serviceUser: EmployeesService,
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
    this.serviceUser.getUsers().pipe(
      map( (element:any) =>{
        element.data.forEach((user:any) => {
          user.image = `${environment.base_API_url}${user.image}`;
        });
        return element.data;
      }),
    ).subscribe(resp => {
      this.employees = resp;
    })
  }
  userFilter(event:any){
    this.serviceUser.getUsers(event.target.value).subscribe(resp => {
      this.employees = resp.data
    })
  }
  selectUser(user_selected:number){
    this.employees.forEach((user:any) => {
      if (user_selected == user.id) {
        this.user_id = user_selected;
        this.employe_name = user.name;
        this.employeeImage = user.image
      }
    });
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
      setTimeout(()=>{this.modal.dismissAll()}, 3500);
      this.user_covenant.emit();
    });
  }
  back(){
    this.isSelected = false;
    this.form.reset();
    this.makeForm();
  }
}
