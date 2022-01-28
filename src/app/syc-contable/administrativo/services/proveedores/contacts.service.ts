import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private http:HttpClient
    ) { }

    postContact(formData:any) :Observable<any> {
      return this.http.post<any>(`${environment.API_Url}contact`,formData);
    }
    getContactProvider(provider_id:number): Observable<any>{
      return this.http.get<any>(`${environment.API_Url}contact/provider/${provider_id}`);
    }
}
