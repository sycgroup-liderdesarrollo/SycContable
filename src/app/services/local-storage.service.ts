import { Injectable } from '@angular/core';
import { RefreshTokenInterface } from '../interfaces/refresh-token-interface';
import { TokenResponseInterface } from '../interfaces/token-response-interface';
import { TokenModel } from '../models/token-model';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setToken(token:TokenResponseInterface){
    localStorage.setItem('token',JSON.stringify(token));
    return true;
  }

  getToken():TokenResponseInterface{
    let tokenJson = localStorage.getItem('token');
    let tokenParsed = tokenJson ? JSON.parse(tokenJson) : null;

    let token : TokenResponseInterface = Object.assign(new TokenModel(),tokenParsed);
    return token;
  }

  deleteToken(){
    localStorage.removeItem('token');
    return true;
  }
}
