import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CovenantTypeInterface } from '../../interfaces/covenant-type-interface';
import { CovenantInterface } from '../../interfaces/covenants-interface';
import { PeriodicityTypeInterface } from '../../interfaces/periodicity-type-interface';
import { ProviderInterface } from '../../interfaces/provider-interface';

@Injectable({
  providedIn: 'root'
})
export class CovenantsService {

  constructor(
    private http:HttpClient
  ) { }

    getCovenants(): Observable<CovenantInterface[]>{
      return this.http.get<CovenantInterface[]>(`${environment.API_Url}covenant`);
    }
    getCovenant(id:number): Observable<CovenantInterface>{
      return this.http.get<CovenantInterface>(`${environment.API_Url}covenant/`+id);
    }
    postCovenant(formData:CovenantInterface): Observable<CovenantInterface>{
      return this.http.post<CovenantInterface>(`${environment.API_Url}covenant/`, formData);
    }
    putCovenant(covenant_id:number, formData:CovenantInterface): Observable<CovenantInterface>{
      return this.http.put<CovenantInterface>(`${environment.API_Url}covenant/`+covenant_id, formData);
    }
    deleteCovenant(covenant_id:number): Observable<number>{
      return this.http.delete<number>(`${environment.API_Url}covenant/`+covenant_id);
    }
    getCovenantTypes(): Observable<CovenantTypeInterface[]>{
      return this.http.get<CovenantTypeInterface[]>(`${environment.API_Url}covenantType/`);
    }
    getPeriodicityTypes(): Observable<PeriodicityTypeInterface[]>{
      return this.http.get<PeriodicityTypeInterface[]>(`${environment.API_Url}periodicityType/`);
    }
    getProviders(): Observable<ProviderInterface[]>{
      return this.http.get<ProviderInterface[]>(`${environment.API_Url}provider/`);
    }
}
