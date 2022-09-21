import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './clases/usuario';
import { JwtResponse } from './jwt-response';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url="http://localhost:8080/"
  authenticated :boolean;
  usuario:Usuario;
  jwtResponse:JwtResponse;
  credentials:any;
  constructor(private http: HttpClient) {
  }

  authenticate(username: any,password: any,callback:any) {
        this.http.post<JwtResponse>(this.url+'authenticate', {username,password} ).subscribe(response => {
          this.jwtResponse=response;
          console.log("respuesta "+this.jwtResponse.token);
              sessionStorage.setItem('username',username);
              let tokenString='Bearer '+this.jwtResponse.token;
                this.authenticated = true;
                sessionStorage.setItem('token',tokenString);
                //this.usuario=sessionStorage.getItem('username');
            return callback && callback()&&this.usuario;
        }, (e: HttpErrorResponse) => console.log("status:"+e.status))
        ;

    }
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username')
    console.log(!(user === null))
    return !(user === null)
  }

    getUsuario(){
      return this.usuario;
    }
    getAuthenticated():Boolean{
      return this.authenticated;
    }

}
