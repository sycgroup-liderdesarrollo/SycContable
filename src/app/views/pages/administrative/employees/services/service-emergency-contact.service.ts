import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResponseInterfaces } from 'src/app/interfaces/json-response-interfaces';
import { environment } from 'src/environments/environment';
import { EmergencyContactInterface } from '../interfaces/emergency-contact-interface';

@Injectable({
  providedIn: 'root'
})
export class EmergencyContactService {

  constructor(
    private http: HttpClient
  ) { }

  postEmergencyContact(form:any) :Observable<JsonResponseInterfaces<EmergencyContactInterface>>{
    return this.http.post<JsonResponseInterfaces<EmergencyContactInterface>>(`${environment.API_Url}emergencyContact`,form);
  }
  putEmergencyContact(contact_id: number, form:any):Observable<JsonResponseInterfaces<EmergencyContactInterface>>{
    return this.http.put<JsonResponseInterfaces<EmergencyContactInterface>>(`${environment.API_Url}emergencyContact/`+contact_id,form);
  }
}
