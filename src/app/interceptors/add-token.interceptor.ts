import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../services/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AddTokenInterceptorService implements HttpInterceptor {

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
