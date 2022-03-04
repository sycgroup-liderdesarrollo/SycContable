import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeInterface } from '../../interfaces/employee-interface';
import { EmployeesService } from '../../services/service-employees.service';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {

  user_id:number;
  user_data:EmployeeInterface;

  constructor(
    private _route:ActivatedRoute,
    private serviceUser: EmployeesService
    ) {}

  ngOnInit(): void {
    this.user_id = +this._route.snapshot.paramMap.get('id')!
    this.getUser();
  }

  getUser(){
    this.serviceUser.getEmployee(this.user_id).subscribe(resp => {
      this.user_data = resp.data
      console.log(this.user_data);

    })
  }

}


