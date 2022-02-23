import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeInterface } from '../../interfaces/employee-interface';
import { JsonResponseInterfaces } from 'src/app/interfaces/json-response-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ServiceEmployeesService {

  constructor(
    private http: HttpClient
  ) { }

  getEmployed(filterValue?:any) :Observable<JsonResponseInterfaces<EmployeeInterface[]>> {
    if( filterValue){
      return this.http.get<JsonResponseInterfaces<EmployeeInterface[]>>(`${environment.API_Url}user`,{params:{'filter':  filterValue }});
    }
    return this.http.get<JsonResponseInterfaces<EmployeeInterface[]>>(`${environment.API_Url}user`);
  }

  postEmployed(formdata : any) :Observable<JsonResponseInterfaces<EmployeeInterface[]>> {
    return this.http.post<JsonResponseInterfaces<EmployeeInterface[]>>(`${environment.API_Url}user`,formdata);
  }

  getEmployee(id:string | null): Observable<JsonResponseInterfaces<EmployeeInterface[]>>{
    return this.http.get<JsonResponseInterfaces<EmployeeInterface[]>>(`${environment.API_Url}user/${id}`);
  }
}
