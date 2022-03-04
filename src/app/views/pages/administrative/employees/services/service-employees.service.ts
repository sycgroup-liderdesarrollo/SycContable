import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JsonResponseInterfaces } from 'src/app/interfaces/json-response-interfaces';
import { EmployeeInterface } from '../interfaces/employee-interface';

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

  assignCovenant(user_id:number, formData:any): Observable<EmployeeInterface[]>{
    return this.http.post<EmployeeInterface[]>(`${environment.API_Url}user/assignCovenant/`+ user_id, formData);
  }
  deleteUserCovenant(user_id:number, pivot_id:any): Observable<any>{

    return this.http.delete<any>(`${environment.API_Url}user/deleteCovenant/`+ user_id, {params:{'covenant_pivot_id':  pivot_id }});
  }
}
