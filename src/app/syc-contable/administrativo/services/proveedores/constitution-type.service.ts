import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConstitutionTypeService {

  constructor(private http: HttpClient) { }

  getConstitutionType():Observable<any>{
    return this.http.get<any>(`${environment.API_Url}constitutionType`);
  }
}
