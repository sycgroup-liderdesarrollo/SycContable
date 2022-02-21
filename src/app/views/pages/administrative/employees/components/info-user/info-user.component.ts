import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeInterface } from '../../../interfaces/employee-interface';
import { ServiceEmployeesService } from '../../services/service-employees.service';


@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {

 
  users:EmployeeInterface;
  
  constructor(
    private router:Router,
    private serviceEmployees:ServiceEmployeesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const userId = params.has("id") ? params.get("id") : '';
      if(params.has("id")){
        this.serviceEmployees.getEmployee(userId).subscribe(res => {
          console.log(res);
        })
      }
    })
    
  }
}


