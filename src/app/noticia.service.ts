import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from './noticia';

@Injectable({
  providedIn: 'root'
})
export class NoticiaService {
  private noticiaUrl:string;
  constructor(private http:HttpClient) {
    this.noticiaUrl="http://localhost:8080/noticias";
   }
   public findAll():Observable<Noticia[]>{
    return this.http.get<Noticia[]>(this.noticiaUrl);
   }
   public save(noticia:Noticia){
    return this.http.post<Noticia>(this.noticiaUrl,Noticia);
   }
   public findByid(noticia:Number):Observable<Noticia>{
    return this.http.get<Noticia>(this.noticiaUrl+'/'+noticia);
   }
}
