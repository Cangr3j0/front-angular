import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from './clases/noticia';

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
    const httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json'})
    }

    //En el post la noticia que se pasa por parametro debe ser pasada a json sino retorna error
    //Unrecognized token etc.
    const body=JSON.stringify(noticia);
    return this.http.post<Noticia>(this.noticiaUrl,body,httpOptions);
   }
   public findByid(noticia:string):Observable<Noticia>{
    return this.http.get<Noticia>(this.noticiaUrl+'/'+noticia);
   }
   public getLikes(noticia:string):Observable<number>{
    return this.http.get<number>(this.noticiaUrl+"/like/"+noticia);
   }
}
