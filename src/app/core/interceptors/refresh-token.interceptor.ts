import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {

  refreshTokenInProgress = false;
  accessTokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private authService: AuthService) { }
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError( (e:HttpErrorResponse) => {
        if (e instanceof HttpErrorResponse && e.status === 401 && this.authService.isAuthenticated()){
          if (!this.refreshTokenInProgress) {
            this.refreshTokenInProgress = true;
            this.accessTokenSubject.next('');

            return this.authService.refreshToken().pipe(
              switchMap(authResponse => {
                this.refreshTokenInProgress = false;
                this.accessTokenSubject.next(authResponse.access_token);
                request = request.clone({
                  setHeaders: {
                      authorization: `Bearer ${authResponse.access_token}`
                  }
                });
                return next.handle(request);
              }),
              catchError( (e : HttpErrorResponse) => {
                this.refreshTokenInProgress = false;
                this.authService.logout();
                return throwError(e);
              })
            )
          }
          else{

            /* return this.accessTokenSubject.pipe(
              filter(access_token=> access_token !== ''),
              take(1),
              switchMap(token => {
                request = request.clone({
                  setHeaders : {
                    authorization: `Bearer ${token}`
                  }
                });
                return next.handle(request);
              })
            ) */
            this.authService.logout();
          }
        }
        else if (e instanceof HttpErrorResponse && e.status === 401) {
          this.authService.logout();
        }
        return throwError(e);
      })
    )
  }
}
