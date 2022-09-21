import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Autor } from '../clases/autor';
import { Comentario } from '../clases/comentario';
import { ComentarioService } from '../comentario.service';
import { ComentarioComponent } from '../comentario/comentario.component';

@Component({
  selector: 'app-agregar-comentario',
  templateUrl: './agregar-comentario.component.html',
  styleUrls: ['./agregar-comentario.component.css']
})
export class AgregarComentarioComponent implements OnInit {
contenido: string;
comentarioService:ComentarioService;
idNoticia: string;
private comentarios:ComentarioComponent;
  constructor(comentarioService:ComentarioService,private route:ActivatedRoute) { 
    this.comentarioService=comentarioService;
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.idNoticia = params.get('id');});
  }
  postearComentario(){
    let nuevoComentario:Comentario;
    console.log(this.contenido);
this.comentarioService.postCommentary(this.contenido,this.idNoticia);
}}
