import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { EmployeeInterface } from '../../interfaces/employee-interface';

@Injectable({
  providedIn: 'root'
})
export class ServiceEmployeesService {

  constructor(
    private http: HttpClient
  ) { }

  getEmployed(filterValue?:any) :Observable<EmployeeInterface[]> {
    if( filterValue){
      return this.http.get<EmployeeInterface[]>(`${environment.API_Url}user`,{params:{'filter':  filterValue }});
    }
    return this.http.get<EmployeeInterface[]>(`${environment.API_Url}user`);
  }

  postEmployed(formdata : any) :Observable<EmployeeInterface[]> {
    return this.http.post<EmployeeInterface[]>(`${environment.API_Url}user`,formdata);
  }

  getEmployee(id:string | null): Observable<EmployeeInterface[]>{
    return this.http.get<EmployeeInterface[]>(`${environment.API_Url}user/${id}`);
  }
}
