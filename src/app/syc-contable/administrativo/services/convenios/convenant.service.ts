import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvenantService {

  constructor(
    private http: HttpClient
    ) { }

  getcovenant() {
    return this.http.get<any>('http://192.168.10.138:8090/api/covenant')
  }

  postConvenant(formdata : any) :Observable<any> {
    return this.http.post<any>('http://192.168.10.138:8090/api/covenant',formdata);
  }
  deleteConvenant(id: any){
    return this.http.delete<any>('http://192.168.10.138:8090/api/covenant/'+ id);
 }
   putConvenant(id:any): Observable<any>{
   
  return  this.http.get<any>('http://192.168.10.138:8090/api/covenant/'+ id);
}
updateConvenant(formdata:any, id:any): Observable<any>{
    
  return  this.http.put<any>('http://192.168.10.138:8090/api/covenant/' + id,formdata);
}

}