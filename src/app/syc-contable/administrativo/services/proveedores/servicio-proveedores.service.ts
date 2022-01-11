import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicioProveedoresService {

  constructor(
    private http: HttpClient
    ) {}
    
  getProvider() :Observable<any> {
    return this.http.get<any>(`${environment.API_Url}provider`);
  }
 
  postProvider(formdata : any) :Observable<any> {
    return this.http.post<any>(`${environment.API_Url}provider`,formdata);
  }
  deleteProvider(id: any){
     return this.http.delete<any>(`${environment.API_Url}provider/`+ id);
  }
  putProvider(id:any): Observable<any>{
   
    return  this.http.get<any>(`${environment.API_Url}provider/`+ id);
  }
  updateProvider(formdata:any, id:any): Observable<any>{
    
    return  this.http.put<any>(`${environment.API_Url}provider/` + id,formdata);
  }
}
