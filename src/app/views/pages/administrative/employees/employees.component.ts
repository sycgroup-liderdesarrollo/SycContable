import { Component, OnInit } from '@angular/core';
import { ServiceEmployeesService } from './services/service-employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  users:any;
  page = 1;
  pageSize = 4;
  total:number;

  constructor(
    private serviceEmployees:ServiceEmployeesService
  ) { }

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(){
    this.serviceEmployees.getEmployed().subscribe(res =>{
      this.users = res.data;
    })
  }

}
