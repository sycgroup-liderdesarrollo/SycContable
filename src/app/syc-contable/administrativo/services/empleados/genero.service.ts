import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeneroService {

  constructor(
    private http: HttpClient
    ) { }

    getGenero() :Observable<any> {
      return this.http.get<any>(`${environment.API_Url}gender`);
    }
}
