import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioNominaService {

  constructor( 
    private http:HttpClient
    ) { }

  
  getNomina() :Observable<any> {
    return this.http.get<any>('http://192.168.10.138:8090/api/payroll');
  }
  postNomina(formdata : any) :Observable<any> {
    return this.http.post<any>('http://192.168.10.138:8090/api/payroll',formdata);
  }
  deleteNomina(id: any){
     return this.http.delete<any>('http://192.168.10.138:8090/api/payroll/'+ id);
  }
  putNomina(id:any): Observable<any>{
   
    return  this.http.get<any>('http://192.168.10.138:8090/api/payroll/'+ id);
  }
  updateNomina(formdata:any, id:any): Observable<any>{
    
    return  this.http.put<any>('http://192.168.10.138:8090/api/payroll/' + id,formdata);
  }
}
