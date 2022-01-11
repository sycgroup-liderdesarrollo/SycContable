import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConvenantService {

  constructor(
    private http: HttpClient
    ) { }

  getcovenant() {
    return this.http.get<any>(`${environment.API_Url}covenant`)
  }

  postConvenant(formdata : any) :Observable<any> {
    return this.http.post<any>(`${environment.API_Url}covenant`,formdata);
  }
  deleteConvenant(id: any){
    return this.http.delete<any>(`${environment.API_Url}covenant/`+ id);
 }
   putConvenant(id:any): Observable<any>{
   
  return  this.http.get<any>(`${environment.API_Url}covenant/`+ id);
}
updateConvenant(formdata:any, id:any): Observable<any>{
    
  return  this.http.put<any>(`${environment.API_Url}covenant/` + id,formdata);
}

}