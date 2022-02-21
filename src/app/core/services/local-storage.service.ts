import { Injectable } from '@angular/core';
import { TokenModel } from '../models/token-model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setToken(token:any){
    localStorage.setItem('token',JSON.stringify(token));
    return true;
  }

  getToken():any{
    let tokenJson = localStorage.getItem('token');
    let tokenParsed = tokenJson ? JSON.parse(tokenJson) : null;

    let token : any = Object.assign(new TokenModel(),tokenParsed);
    return token;
  }

  deleteToken(){
    localStorage.removeItem('token');
    return true;
  }
}
