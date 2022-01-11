import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioNominaService {

  constructor( 
    private http:HttpClient,
    ) { }

  
  getNomina(employeeId:number) :Observable<any> {
    return this.http.get<number>(`${environment.API_Url}payroll/user/${employeeId}`);
  }
  postNomina(formdata : any) :Observable<any> {
    return this.http.post<any>(`${environment.API_Url}payroll`,formdata);
  }
  putNomina(id:any): Observable<any>{
   
    return  this.http.get<any>(`${environment.API_Url}payroll/`+ id);
  }
  updateNomina(formdata:any, id:any): Observable<any>{
    
    return  this.http.put<any>(`${environment.API_Url}payroll/` + id,formdata);
  }
}
