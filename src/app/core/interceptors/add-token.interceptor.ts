import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable()
export class AddTokenInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    const reqClone = req.clone({
      setHeaders: {Authorization : `Bearer ${this.getToken()}`}
    });
    return next.handle(reqClone);
  }

  getToken(){
    const storageService = new LocalStorageService();
    let token = storageService.getToken();
    return token.access_token;
  }
}
