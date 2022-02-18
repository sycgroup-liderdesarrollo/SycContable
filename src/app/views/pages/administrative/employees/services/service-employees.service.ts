import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServiceEmployeesService {

  constructor(
    private http: HttpClient
  ) { }

  getEmployed(filterValue?:any) :Observable<any> {
    if( filterValue){
      return this.http.get<any>(`${environment.API_Url}user`,{params:{'filter':  filterValue }});
    }
    return this.http.get<any>(`${environment.API_Url}user`);
  }

  postEmployed(formdata : any) :Observable<any> {
    return this.http.post<any>(`${environment.API_Url}user`,formdata);
  }

  getEmployee(id:any): Observable<any>{
   
    return  this.http.get<any>(`${environment.API_Url}user/`+ id);
}
}
