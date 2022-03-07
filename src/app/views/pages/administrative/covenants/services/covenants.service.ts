import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResponseInterfaces } from 'src/app/interfaces/json-response-interfaces';
import { environment } from 'src/environments/environment';
import { PeriodicityTypeInterface } from '../../../payroll/interfaces/periodicity-type-interface';
import { CovenantInterface } from '../interfaces/covenants-interface';
import { ProviderInterface } from '../interfaces/provider-interface';

@Injectable({
  providedIn: 'root'
})
export class CovenantsService {

  constructor(
    private http:HttpClient
  ) { }

    getCovenants(): Observable<JsonResponseInterfaces<CovenantInterface[]>>{
      return this.http.get<JsonResponseInterfaces<CovenantInterface[]>>(`${environment.API_Url}covenant`);
    }
    getCovenant(id:number): Observable<JsonResponseInterfaces<CovenantInterface>>{
      return this.http.get<JsonResponseInterfaces<CovenantInterface>>(`${environment.API_Url}covenant/`+id);
    }
    postCovenant(formData:CovenantInterface): Observable<JsonResponseInterfaces<CovenantInterface>>{
      return this.http.post<JsonResponseInterfaces<CovenantInterface>>(`${environment.API_Url}covenant/`, formData);
    }
    putCovenant(covenant_id:number, formData:CovenantInterface): Observable<JsonResponseInterfaces<CovenantInterface>>{
      return this.http.put<JsonResponseInterfaces<CovenantInterface>>(`${environment.API_Url}covenant/`+covenant_id, formData);
    }
    deleteCovenant(covenant_id:number): Observable<number>{
      return this.http.delete<number>(`${environment.API_Url}covenant/`+covenant_id);
    }
    getCovenantTypes(): Observable<JsonResponseInterfaces<CovenantInterface[]>>{
      return this.http.get<JsonResponseInterfaces<CovenantInterface[]>>(`${environment.API_Url}covenantType/`);
    }
    getPeriodicityTypes(): Observable<JsonResponseInterfaces<PeriodicityTypeInterface[]>>{
      return this.http.get<JsonResponseInterfaces<PeriodicityTypeInterface[]>>(`${environment.API_Url}periodicityType/`);
    }
    getProviders(): Observable<JsonResponseInterfaces<ProviderInterface[]>>{
      return this.http.get<JsonResponseInterfaces<ProviderInterface[]>>(`${environment.API_Url}provider/`);
    }
}
