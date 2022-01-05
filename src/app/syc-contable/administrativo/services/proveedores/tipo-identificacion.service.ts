import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoIdentificacionService {

  constructor(
    private http:HttpClient
    ) { }

    getTipoIdentificacion() :Observable<any> {
      return this.http.get<any>('http://192.168.10.138:8090/api/identificationType' );
    }
}
