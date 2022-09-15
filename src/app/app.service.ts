import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './clases/usuario';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  private url="http://localhost:8080/"
  authenticated :boolean;
  usuario:Usuario;
  credentials:any;
  constructor(private http: HttpClient) {
  }

  authenticate(credentials:any,callback:any) {
        const headers = new HttpHeaders(credentials ? {
            authorization : 'Basic ' + btoa(credentials.username + ':' + credentials.password)
        } : {});
        this.http.get<Usuario>(this.url+'user', {headers: headers} ).subscribe(response => {
          this.usuario=response;
          console.log("respuesta "+this.usuario['name']);
          console.log("session storage: "+sessionStorage.getItem('username'))
            if (this.usuario['name']) {
              sessionStorage.setItem('username',this.usuario['name']);
              let authString='Basic '+btoa(credentials.username + ':' + credentials.password);
                this.authenticated = true;
                sessionStorage.setItem('authorization',authString);
                //this.usuario=sessionStorage.getItem('username');
                console.log(this.usuario.name)
            } else {
                this.authenticated = false;
                console.log("entre en el false de service app")
            }
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
