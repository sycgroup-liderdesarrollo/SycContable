import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JsonResponseInterfaces } from 'src/app/interfaces/json-response-interfaces';
import { environment } from 'src/environments/environment';
import { ProviderInterface } from '../interfaces/provider-interface';

@Injectable({
  providedIn: 'root'
})
export class ProvidersService {

  constructor(
    private http: HttpClient
  ) { }

  getProviders(filterValue?: string, pageSize?: number, pageNumber?: number): Observable<JsonResponseInterfaces<ProviderInterface[]>>{
    return this.http.get<JsonResponseInterfaces<ProviderInterface[]>>(`${environment.API_Url}provider`, {params:{'filter': filterValue ?? '', 'page': pageNumber ?? '', 'paginate': pageSize ?? ''}});
  }
  getProvider(provider_id: number): Observable<JsonResponseInterfaces<ProviderInterface>>{
    return this.http.get<JsonResponseInterfaces<ProviderInterface>>(`${environment.API_Url}provider/`+provider_id);
  }
}
