import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  headers : HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });


  getNomina(employeeId:number) :Observable<any> {
    return this.http.get<number>(`${environment.API_Url}payroll/user/${employeeId}`);
  }
  putNomina(id:any): Observable<any>{
    return  this.http.get<any>(`${environment.API_Url}payroll/`+ id);
  }
  getConsultaDeduccion(period_id:number, covenants_id:number, created_at:any):Observable<any>{
    return this.http.get<any>(`${environment.API_Url}consultDeduccion/`,{headers: this.headers, params: {'period_id': period_id, 'covenants_id':covenants_id, 'created_at':created_at}});
  }
}
