import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { EmployeeInterface } from '../../../interfaces/employee-interface';
import { ServiceEmployeesService } from '../../services/service-employees.service';


@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {

  form!: FormGroup;
  user:any;
  
  constructor(
    private router:Router,
    private serviceEmployees:ServiceEmployeesService,
    private route: ActivatedRoute,
    config: NgbNavConfig
  ) { config.destroyOnHide = false;
    config.roles = false; }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params=>{
      const userId = params.has("id") ? params.get("id") : '';
      if(params.has("id")){
        this.serviceEmployees.getEmployee(userId).subscribe(res => {
          this.user = res.data
          console.log(res);
          
        })
      }
    })
    
  }
}


