import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConceptInterface } from 'src/app/interfaces/concept-interface';
import { JsonResponseInterfaces } from 'src/app/interfaces/json-response-interfaces';
import { PayrollInterface } from 'src/app/interfaces/payroll-interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayrollService {

  constructor(
    private http:HttpClient
  ) { }

  getUserPayroll(user_id:number): Observable<JsonResponseInterfaces<PayrollInterface>>{
    return this.http.get<JsonResponseInterfaces<PayrollInterface>>(`${environment.API_Url}payroll/user/`+user_id);
  }
  getConcetps(type_filter?:number, concept_name?:string): Observable<JsonResponseInterfaces<ConceptInterface[]>>{
    if(type_filter && concept_name){
      return this.http.get<JsonResponseInterfaces<ConceptInterface[]>>(`${environment.API_Url}concept`, {params:{'type': type_filter, 'filter': concept_name, 'paginate': 20}});
    }
    else if (type_filter){
      return this.http.get<JsonResponseInterfaces<ConceptInterface[]>>(`${environment.API_Url}concept`, {params:{'type': type_filter, 'paginate': 20}});
    }
    else{
      return this.http.get<JsonResponseInterfaces<ConceptInterface[]>>(`${environment.API_Url}concept`, {params:{'paginate': 20}});
    }
  }
  addConcept(payroll_id:number, formData:any): Observable<JsonResponseInterfaces<ConceptInterface[]>>{
    return this.http.post<JsonResponseInterfaces<ConceptInterface[]>>(`${environment.API_Url}addConcept/`+payroll_id, formData);
  }
  deleteConcept(payroll_id:number, concept_pivot_id:number): Observable<JsonResponseInterfaces<ConceptInterface[]>>{
    return this.http.delete<JsonResponseInterfaces<ConceptInterface[]>>(`${environment.API_Url}deleteConcept/`+payroll_id, {params: {'conceptPivotId': concept_pivot_id}});
  }
}
