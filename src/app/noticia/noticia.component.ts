import { Component, OnInit } from '@angular/core';
import { NoticiaService } from '../noticia.service';
import { ActivatedRoute, Router } from '@angular/router'
import { Observable, Subscription } from 'rxjs';
import { ComentarioService } from '../comentario.service';
import { Comentario } from '../clases/comentario';
import { Noticia } from '../clases/noticia';

@Component({
  selector: 'app-noticia',
  templateUrl: './noticia.component.html',
  styleUrls: ['./noticia.component.css']
})
export class NoticiaComponent implements OnInit {
  sub: Subscription;
  id:string;
  noticiaService:NoticiaService;
  noticia: Noticia;
  comentarioService: ComentarioService;
  comentarios:Observable<Comentario[]>;
  constructor(noticiaService:NoticiaService,private _Activatedroute:ActivatedRoute,private _router:Router,comentarioService:ComentarioService) {
    this.noticiaService=noticiaService;
    this.comentarioService=comentarioService;
   }

  ngOnInit(): void {
    this.id = this._Activatedroute.snapshot.params['id'];
    this.comentarioService.findByid(this.id);
    this.comentarios=this.comentarioService.getComentarios;
    this.noticiaService.findByid(this.id).subscribe(data =>{
      this.noticia=data;
      console.log(data);
    })
  }
  

}
