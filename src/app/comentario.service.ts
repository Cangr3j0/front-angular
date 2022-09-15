import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comentario } from './clases/comentario';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private url="http://localhost:8080/comentarios/"
  constructor(private http:HttpClient) { 

  }

  public findByid(id:string):Observable<Comentario[]>{
    return this.http.get<Comentario[]>(this.url+id);
  }
  public cantComentariosById(id:string):Observable<number>{
    return this.http.get<number>(this.url+"cantidad/"+id);
  }
}
