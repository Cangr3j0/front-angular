import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Autor } from './clases/autor';
import { Usuario } from './clases/usuario';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  private usersUrl: string;


  constructor(private http:HttpClient) { 
    this.usersUrl = environment.serverUrl+'/users';
  }

  public findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usersUrl);
  }
  public save(user: Usuario) {
    return this.http.post<Usuario>(this.usersUrl, user);
  }
  public findByName(user:string):Observable<Autor>{
    return this.http.get<Autor>(this.usersUrl+'/'+user);
  }
  public createUser(user:Usuario){
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }
    const body=JSON.stringify(user);
    return this.http.post<Usuario>(this.usersUrl+'/create',body,httpOptions);
  }
  public getLastUsers():Observable<Usuario[]>{
    return this.http.get<Usuario[]>(this.usersUrl+'/lastusers');
  }
}
