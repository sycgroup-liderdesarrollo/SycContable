import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
    ){ }

  getEmployed(filterValue?:any) :Observable<any> {
    if( filterValue){
      return this.http.get<any>(`${environment.API_Url}user`,{params:{'filter':  filterValue }});
    }
    return this.http.get<any>(`${environment.API_Url}user`);
      
  }
  postEmployed(formdata : any) :Observable<any> {
    return this.http.post<any>(`${environment.API_Url}user`,formdata);
  }
  deleteEmployee(id: any){
     return this.http.delete<any>(`${environment.API_Url}user/`+ id);
  }
  putEmployee(id:any): Observable<any>{
   
      return  this.http.get<any>(`${environment.API_Url}user/`+ id);
  }
  updateEmployee(formdata:any, id:any): Observable<any>{
    
    return  this.http.put<any>(`${environment.API_Url}user/` + id,formdata);
  }
}
