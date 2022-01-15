import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConceptService {
  constructor(
    private http:HttpClient,
  ) { }

  headers : HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json'
  });


  getConcepts( typeId: number){
      return this.http
        .get<any>(`${environment.API_Url}concept`,{headers: this.headers, params: {'type': typeId}});
  }

  addConcepts(formdata:any, id:any) :Observable<any> {
    return this.http.post<any>(`${environment.API_Url}payrollConcept/${id}` ,formdata);
  }

  removeConcept(id:any){
    return this.http.delete<any>(`${environment.API_Url}payroll/`+ id);
  }
}
