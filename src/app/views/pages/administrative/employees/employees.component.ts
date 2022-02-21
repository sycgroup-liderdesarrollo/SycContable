import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeInterface } from '../interfaces/employee-interface';
import { ServiceEmployeesService } from './services/service-employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  

  users:EmployeeInterface[];
  page = 1;
  pageSize = 4;
  total:number;

  constructor(
    private router:Router,
    private serviceEmployees:ServiceEmployeesService
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.serviceEmployees.getEmployed().subscribe(res =>{
      this.users = res;
      console.log(res);
    })
  }

  verProfile(userId:number){
    this.router.navigate(["/administrative/info-user",userId])
  }

}
