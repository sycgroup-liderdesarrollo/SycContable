import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CovenantsService {

  constructor(
    private http:HttpClient
  ) { }

    getCovenants(): Observable<any>{
      return this.http.get<any>(`${environment.API_Url}covenant`);
    }
    getCovenant(id:number): Observable<any>{
      return this.http.get<any>(`${environment.API_Url}covenant/`+id);
    }
}
