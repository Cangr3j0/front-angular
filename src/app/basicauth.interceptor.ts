import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
import { ErrorBehavior } from './clases/ErrorBehavior';

@Injectable()
export class BasicauthInterceptor implements HttpInterceptor {
  errorBehavior:ErrorBehavior;

  constructor(public router: Router,public errorService:ErrorService) {}
  

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
        console.log(error);
        if (error.status == 401) {
          //this.errorBehavior.hayError=true;
          //this.errorBehavior.mensajeError=error.error;
          this.errorService.getError(true,error.error);
          //this.router.navigate(['/login'])
          //sessionStorage.removeItem('token');
          //sessionStorage.removeItem('username');

        } else if(error.status == 0){
         // this.router.navigate(['/error'])
        // this.errorBehavior.hayError=true;
         //this.errorBehavior.mensajeError=error.error;
         this.errorService.getError(true,error.error);
        }
        else if(error.status==403){
          //error.hayError=true;
          //error.mensajeError=error.error;
          this.errorService.getError(true,error.error);

        }
        else if(error.status==500){
          //error.hayError=true;
          //error.mensajeError=error.error;
          this.errorService.getError(true,error.error);
          this.router.navigate(['/login'])
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('username');
        }
        else{
          console.log(error);
          this.errorService.getError(true,error.error);
        }
        return of(error)
      }),
    );
  }
}
