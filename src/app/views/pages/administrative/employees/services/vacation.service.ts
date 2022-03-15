import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResponseInterfaces } from 'src/app/interfaces/json-response-interfaces';
import { environment } from 'src/environments/environment';
import { VacationInterface } from '../interfaces/vacation-interface';

@Injectable({
  providedIn: 'root'
})
export class VacationService {

  constructor(
    private http: HttpClient
  ) { }

  getVacations(pageSize?:number, pageNumber?:number) : Observable<JsonResponseInterfaces<VacationInterface[]>>{
    return this.http.get<JsonResponseInterfaces<VacationInterface[]>>(`${environment.API_Url}vacation`, {params:{'page': pageNumber ?? '', 'paginate': pageSize ?? ''}});
  }
  postVacation(form: VacationInterface) : Observable<JsonResponseInterfaces<VacationInterface>>{
    return this.http.post<JsonResponseInterfaces<VacationInterface>>(`${environment.API_Url}vacation`, form);
  }
  putVacation(vacation_id: number, form: any) : Observable<JsonResponseInterfaces<VacationInterface>>{
    return this.http.put<JsonResponseInterfaces<VacationInterface>>(`${environment.API_Url}vacation/`+ vacation_id, form);
  }
  deleteVacation(vacation_id: number): Observable<JsonResponseInterfaces<VacationInterface>>{
    return this.http.delete<JsonResponseInterfaces<VacationInterface>>(`${environment.API_Url}vacation/`+vacation_id);
  }
}
