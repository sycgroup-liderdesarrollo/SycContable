import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactoEmergenciaService {

  constructor(
    private http:HttpClient
    ) { }
    getContactoEmergencia(id:any):Observable<any>{
      return this.http.get<any>(`${environment.API_Url}emergencyContact/`+ id);
    }
    postContacts(formData:any) :Observable<any> {
      return this.http.post<any>(`${environment.API_Url}emergencyContact`,formData);
    }
    putContacts(id:any, formData:any) :Observable<any> {
      return this.http.put<any>(`${environment.API_Url}emergencyContact/`+ id, formData);
    }
    getKinship(): Observable<any>{
      return this.http.get<any>(`${environment.API_Url}kinship`);
    }
}
