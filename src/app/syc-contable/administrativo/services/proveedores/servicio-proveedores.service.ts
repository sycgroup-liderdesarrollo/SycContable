import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioProveedoresService {

  constructor(
    private http: HttpClient
    ) {}
    
  getProvider() :Observable<any> {
    return this.http.get<any>('http://192.168.10.138:8090/api/provider');
  }
 
  postProvider(formdata : any) :Observable<any> {
    return this.http.post<any>('http://192.168.10.138:8090/api/provider',formdata);
  }
  deleteProvider(id: any){
     return this.http.delete<any>('http://192.168.10.138:8090/api/provider/'+ id);
  }
  putProvider(id:any): Observable<any>{
   
    return  this.http.get<any>('http://192.168.10.138:8090/api/provider/'+ id);
  }
  updateProvider(formdata:any, id:any): Observable<any>{
    
    return  this.http.put<any>('http://192.168.10.138:8090/api/provider/' + id,formdata);
  }
}
