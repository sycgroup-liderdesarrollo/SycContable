import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacacionesserviceService {

  constructor(
    private http: HttpClient
    ) { }

    getVacaciones() :Observable<any> {
      return this.http.get<any>(`${environment.API_Url}vacation`);
    }

    postVacaciones(formdata:any) :Observable<any> {
      return this.http.post<any>(`${environment.API_Url}vacation`,formdata);
    }
    getUsers(){
      return this.http.get<any>(`${environment.API_Url}usersColletion`);
    }
    

  }
