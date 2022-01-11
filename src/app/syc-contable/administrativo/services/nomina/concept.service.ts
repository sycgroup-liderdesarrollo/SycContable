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


  getConcepts( filterType?:any){
      console.log('Entre al servicio');
      console.log(filterType);
      
      return this.http
        .get<any>(`${environment.API_Url}concept`,{headers: this.headers, params: {'type': filterType}});
  }

  addConcept(){

  }

  removeConcept(){
    
  }
}
