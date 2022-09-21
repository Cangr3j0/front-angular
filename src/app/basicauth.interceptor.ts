import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class BasicauthInterceptor implements HttpInterceptor {


  constructor(public router: Router) {}
  

  //Interceptar el request para ver si esta logeado el usuario y existe el token 
  //Si el usuario no esta logeado (no existe el token) entonces lo llevo a el login
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
   if(sessionStorage.getItem('username')&&sessionStorage.getItem('token')){
    request=request.clone({
      setHeaders:{ Authorization : sessionStorage.getItem('token')}
    })
   }
    return next.handle(request).pipe(
      catchError((error: any) => {
        if (error.status == 401 || error.status == 0|| error.status==500) {
          this.router.navigate(['/login'])
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('username');
        } else {
        }
        return of(error)
      }),
    );
  }
}
