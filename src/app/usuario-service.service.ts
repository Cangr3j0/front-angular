import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioServiceService {
  private usersUrl: string;


  constructor(private http:HttpClient) { 
    this.usersUrl = 'http://localhost:8080/users';
  }

  public findAll(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.usersUrl);
  }
  public save(user: Usuario) {
    return this.http.post<Usuario>(this.usersUrl, user);
  }
}
