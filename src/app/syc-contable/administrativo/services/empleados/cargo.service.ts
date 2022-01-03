import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  constructor(
     private http: HttpClient
    ) { }

    getCargos() :Observable<any> {
      return this.http.get<any>('http://192.168.10.138:8090/api/position');
    }
}
