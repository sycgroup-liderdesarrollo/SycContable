import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RefreshTokenInterface } from '../interfaces/refresh-token-interface';
import { TokenResponseInterface } from '../interfaces/token-response-interface';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private headers: HttpHeaders = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept' : 'application/json'
  });

  constructor(
    private http : HttpClient,
    private localService : LocalStorageService,
    private router : Router
  ) { }

  login(credentials : any): Observable<TokenResponseInterface>{
    let data:any = {
      grant_type : "password",
      client_id : environment.client_id_API,
      client_secret : environment.client_secret_API,
      username : credentials.email,
      password : credentials.password,
      scope : ""
    };

    return this.http.post<TokenResponseInterface>(environment.token_url,data,{headers : this.headers});
  }

  logout(){
    this.localService.deleteToken();
    this.router.navigate(['/']);
  }

  refreshToken() : Observable<TokenResponseInterface>{
    const token = this.localService.getToken();
    let data:RefreshTokenInterface = {
      grant_type : "refresh_token",
      refresh_token : token.refresh_token,
      client_id : environment.client_id_API,
      client_secret : environment.client_secret_API,
      scope : ""
    };
    return this.http.post<TokenResponseInterface>(environment.token_url,data,{headers:this.headers});
  }

  isAuthenticated(): boolean {
    return Boolean(localStorage.getItem('token'));
  }
}
