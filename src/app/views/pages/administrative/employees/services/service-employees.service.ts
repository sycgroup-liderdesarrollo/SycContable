import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JsonResponseInterfaces } from 'src/app/interfaces/json-response-interfaces';
import { EmployeeInterface } from '../interfaces/employee-interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  constructor(
    private http: HttpClient
  ) { }

  getUsers(filterValue?:string, pageSize?:number, pageNumber?:number) :Observable<JsonResponseInterfaces<EmployeeInterface[]>> {
    return this.http.get<JsonResponseInterfaces<EmployeeInterface[]>>(`${environment.API_Url}user`,{params:{'filter':  filterValue ?? '', 'page': pageNumber ?? '', 'paginate': pageSize ?? ''}});
  }
  postUser(formdata : any) :Observable<JsonResponseInterfaces<EmployeeInterface[]>> {
    return this.http.post<JsonResponseInterfaces<EmployeeInterface[]>>(`${environment.API_Url}user`,formdata);
  }
  getUser(id:number): Observable<JsonResponseInterfaces<EmployeeInterface>>{
    return this.http.get<JsonResponseInterfaces<EmployeeInterface>>(`${environment.API_Url}user/${id}`);
  }
  assignCovenant(user_id:number, formData:any): Observable<EmployeeInterface[]>{
    return this.http.post<EmployeeInterface[]>(`${environment.API_Url}user/assignCovenant/`+ user_id, formData);
  }
  deleteUserCovenant(user_id:number, pivot_id:any): Observable<any>{
    return this.http.delete<any>(`${environment.API_Url}user/deleteCovenant/`+ user_id, {params:{'covenant_pivot_id':  pivot_id }});
  }
}
