import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Comentario } from './clases/comentario';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class ComentarioService {
  private url=environment.serverUrl+"/comentarios/"
  respuesta: Comentario;
  public readonly comentariosObserver:BehaviorSubject<Comentario[]>=new BehaviorSubject<Comentario[]>([]);
  constructor(private http:HttpClient) { 

  }

  public findByid(id:string){
    this.http.get<Comentario[]>(this.url+id).subscribe(data =>{
      this.comentariosObserver.next(data);
    });
  }
  public cantComentariosById(id:string):Observable<number>{
    return this.http.get<number>(this.url+"cantidad/"+id);
  }
  public postCommentary(comentario:string,idnoticia:string):Observable<Comentario>{
   return this.http.post<Comentario>(this.url+idnoticia,comentario);
  }
  get getComentarios():Observable<Comentario[]>{
    return this.comentariosObserver.asObservable();
  }
}
