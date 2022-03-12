import { Component, HostListener, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeInterface } from '../../../interfaces/employee-interface';
import { EmployeesService } from '../../../services/service-employees.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-info-user',
  templateUrl: './info-user.component.html',
  styleUrls: ['./info-user.component.scss']
})
export class InfoUserComponent implements OnInit {

  contactText:string;
  user_id:number;
  isUser:boolean = false;
  isContact:boolean = false;
  isBusiness:boolean = false;
  isSecurity:boolean = false;
  user_data:EmployeeInterface;
  pageSize:number;
  classBtnGroup:string;

  @HostListener('window:resize', ['$event'])
  onResize(event:any) {
    this.pageSize = event.target.innerWidth;
    this.pageSize > 850 ? this.classBtnGroup = "btn-group" : this.classBtnGroup = "btn-group-vertical"
  }

  constructor(
    private _route:ActivatedRoute,
    private serviceUser: EmployeesService
    ) {}

    ngOnInit(): void {
    //El valor de la ruta se convierte en tipo number y lo iguala a la variable
    this.user_id = + this._route.snapshot.paramMap.get('id')!
    this.getUser();
    // Captura el tamaño de la pantalla
    this.pageSize = window.innerWidth;
    this.pageSize > 850 ? this.classBtnGroup = "btn-group" : this.classBtnGroup = "btn-group-vertical"

  }

  getUser(){
    this.serviceUser.getUser(this.user_id).pipe(
      map((element:any) =>{
        element.data.image = `${environment.base_API_url}${element.data.image}`;
        return element.data;
      }),
    ).subscribe(resp => {
      this.user_data = resp;
    })
  }

  open(option:string){
    option == "user" ? this.isUser = true : this.isUser = false;
    option == "business" ? this.isBusiness = true : this.isBusiness = false;
    option == "security" ? this.isSecurity = true : this.isSecurity = false;
    option == "contact" ? this.isContact = true : this.isContact = false;
  }

}


