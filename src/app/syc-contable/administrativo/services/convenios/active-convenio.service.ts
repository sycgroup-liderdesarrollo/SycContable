import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ActiveConvenioService {

  constructor(private http:HttpClient) { }

  getactive() :Observable<any> {
    return this.http.get<any>(`${environment.API_Url}active`);
  }

}
