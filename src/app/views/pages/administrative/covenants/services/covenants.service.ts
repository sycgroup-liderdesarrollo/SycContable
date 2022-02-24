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
    postCovenant(formData:any): Observable<any>{
      return this.http.post<any>(`${environment.API_Url}covenant/`, formData);
    }
    putCovenant(covenant_id:number, formData:any): Observable<any>{
      return this.http.put<any>(`${environment.API_Url}covenant/`+covenant_id, formData);
    }
    deleteCovenant(covenant_id:number): Observable<any>{
      return this.http.delete<any>(`${environment.API_Url}covenant/`+covenant_id);
    }
    getCovenantTypes(): Observable<any>{
      return this.http.get<any>(`${environment.API_Url}covenantType/`);
    }
    getPeriodicityTypes(): Observable<any>{
      return this.http.get<any>(`${environment.API_Url}periodicityType/`);
    }
    getProviders(): Observable<any>{
      return this.http.get<any>(`${environment.API_Url}provider/`);
    }
}
