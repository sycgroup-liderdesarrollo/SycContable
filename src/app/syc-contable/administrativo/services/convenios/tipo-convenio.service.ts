import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoConvenioService {

  constructor(private http: HttpClient) { }

  getConvenantType() :Observable<any> {
    return this.http.get<any>(`${environment.API_Url}covenantType`);
  }
  getConvenant() :Observable<any> {
    return this.http.get<any>(`${environment.API_Url}covenant`);
  }
  asignarConvenio(userId:any,formdata:any) :Observable<any> {
    console.log(userId, "Form data: ", formdata);
    console.log('entró al servicio');
    
    return this.http.post<any>(`${environment.API_Url}user/asignarConvenio/${userId}`,formdata);
  }
  selectCovenant(covenantId:any): Observable<any>{
    return this.http.get<any>(`${environment.API_Url}covenant/${covenantId}`);
  }

}
