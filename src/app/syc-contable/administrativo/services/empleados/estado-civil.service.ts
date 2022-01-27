import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EstadoCivilService {

  constructor(
    private http:HttpClient
    ) { }

    getEstadoCivil():Observable<any>{
      return this.http.get<any>(`${environment.API_Url}civilStatu`);
    }
}
