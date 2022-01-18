import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TipoConvenioService {

  constructor(private http: HttpClient) { }

  getConvenant() :Observable<any> {
    return this.http.get<any>(`${environment.API_Url}covenantType`);
  }
  asignarConvenio(convenioId:any,formdata:any) :Observable<any> {
    return this.http.post<any>(`${environment.API_Url}user/asignarConvenio/${convenioId}`,formdata);
  }

}
