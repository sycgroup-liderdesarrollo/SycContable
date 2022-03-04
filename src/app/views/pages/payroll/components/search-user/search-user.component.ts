import { Component, OnInit } from '@angular/core';
import { EmployeeInterface } from '../../../administrative/employees/interfaces/employee-interface';
import { ServiceEmployeesService } from '../../../administrative/employees/services/service-employees.service';
import { PayrollInterface } from '../../interfaces/payroll-interface';
import { PayrollService } from '../../service/payroll.service';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  constructor(
    private serviceUser: ServiceEmployeesService,
    private servicePayroll: PayrollService,
  ) { }
  employees:EmployeeInterface[];
  payroll_data:PayrollInterface;
  isSelected:boolean = false;
  isEmpty:boolean = false;
  employee_name:string;


  ngOnInit(): void {
    this.getEmployees()
  }

  userFilter(event:any){
    this.serviceUser.getEmployed(event.target.value).subscribe(resp => {
      this.employees = resp.data
    })
  }
  getEmployees(){
    this.serviceUser.getEmployed().subscribe(resp => {
      this.employees = resp.data;
    })
  }
  selectUser(user_data:EmployeeInterface){
    this.employee_name = user_data.name;
    this.servicePayroll.getUserPayroll(user_data.id).subscribe(resp =>{
      if (!resp.data) {
        this.isEmpty = true;
        this.isSelected = false;
      }else{
        this.payroll_data = resp.data
        this.isSelected = true;
        this.isEmpty = false;
      }
    })
  }
  refreshPayroll(user_id:number){
    this.servicePayroll.getUserPayroll(user_id).subscribe(resp => {
      this.payroll_data = resp.data
    })
  }
}
