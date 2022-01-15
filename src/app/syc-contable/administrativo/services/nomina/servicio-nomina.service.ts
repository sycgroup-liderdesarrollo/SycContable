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
  putNomina(id:any): Observable<any>{
    return  this.http.get<any>(`${environment.API_Url}payroll/`+ id);
  }
}
