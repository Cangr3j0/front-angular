import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from './clases/usuario';
import { JwtResponse } from './jwt-response';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AppService {
 
  private url = environment.serverUrl;
  authenticated: boolean;
  usuario: Usuario;
  nombreusuario: string;
  jwtResponse: JwtResponse;
  credentials: any;
  usersUrl: string;
  public readonly usernameEmitter:BehaviorSubject<Usuario>=new BehaviorSubject<Usuario>(null);
  public readonly usernameSessionEmitter:BehaviorSubject<string>=new BehaviorSubject<string>('');
  constructor(private http: HttpClient) {
    this.usersUrl = this.url+'/user';
  }

  authenticate(username: any, password: any, callback: any) {
    this.http.post<JwtResponse>(this.url + '/authenticate', { username, password }).subscribe(response => {
      this.jwtResponse = response;
      console.log("respuesta " + this.jwtResponse.token);
      sessionStorage.setItem('username', username);
      this.nombreusuario = username;
      let tokenString = 'Bearer ' + this.jwtResponse.token;
      this.authenticated = true;
      sessionStorage.setItem('token', tokenString);
      //this.usuario=sessionStorage.getItem('username');
      this.getUserSession();
      return callback && callback() && username;
    }, (e: HttpErrorResponse) => console.log("status:" + e.status))
      ;

  }
  isUserLoggedIn() {
    let user = sessionStorage.getItem('username');
    return !(user === null)
  }

  getAuthenticated(): Boolean {
    return this.authenticated;
  }
  setAuthenticated(isAuthenticated: boolean) {
    this.authenticated = isAuthenticated;
  }
  getNombreUsuario() {
    let user = sessionStorage.getItem('username');
    return user;
  }
  public getUser(){
    this.http.get<Usuario>(this.usersUrl).subscribe(data =>{
      this.usernameEmitter.next(data);
    });
  }
  get getUsuario():Observable<Usuario>{
    return this.usernameEmitter.asObservable();
  }
  //usernameSessionEmitter es de tipo BehaviourSubject.
  //El BehaviorSubject me permite ir actualizando el valor a medida que se va cambiando.
  //El valor del usernameSessionEmitter se actualiza cada vez que llamamos a el metodo next(Valor)
  //En este caso se va a actualizar cada vez que llamemos al metodo en el que esta
  // Luego para retornar el valor actualizado necesitamos retornarlo como Observable
  // con el metod .asObservable()

  public getUserSession(){
    this.usernameSessionEmitter.next(sessionStorage.getItem('username'));
  }
  get getUsuarioSession(){
    return this.usernameSessionEmitter.asObservable();
  }

}
