import { Component, OnInit } from '@angular/core';
import { ServiceEmployeesService } from '../../services/service-employees.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {

  users:any;

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
