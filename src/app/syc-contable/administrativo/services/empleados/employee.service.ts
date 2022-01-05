import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(
    private http: HttpClient
    ){ }

  getEmployed(filterValue?:any) :Observable<any> {
    if( filterValue){
      return this.http.get<any>('http://192.168.10.138:8090/api/user',{params:{'filter':  filterValue }});
    }
    return this.http.get<any>('http://192.168.10.138:8090/api/user');
      
  }
  postEmployed(formdata : any) :Observable<any> {
    return this.http.post<any>('http://192.168.10.138:8090/api/user',formdata);
  }
  deleteEmployee(id: any){
     return this.http.delete<any>('http://192.168.10.138:8090/api/user/'+ id);
  }
  putEmployee(id:any): Observable<any>{
   
    return  this.http.get<any>('http://192.168.10.138:8090/api/user/'+ id);
  }
  updateEmployee(formdata:any, id:any): Observable<any>{
    
    return  this.http.put<any>('http://192.168.10.138:8090/api/user/' + id,formdata);
  }
}
