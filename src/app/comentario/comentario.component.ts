import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Comentario } from '../clases/comentario';
import { ComentarioService } from '../comentario.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  public comentarios:Observable<Comentario[]>;
  public id:string;
  public cantComentarios:number;
  contenido: any;
  constructor(private comentarioService:ComentarioService,private route:ActivatedRoute) { }
  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.comentarioService.findByid(this.id);
      this.comentarios=this.comentarioService.getComentarios;
      this.comentarioService.cantComentariosById(this.id).subscribe(data=>{
        this.cantComentarios=data;
      })
    });
  }
  postearComentario(){
    let nuevoComentario:Comentario;
    console.log(this.contenido);
this.comentarioService.postCommentary(this.contenido,this.id).subscribe(()=>{
  this.comentarioService.findByid(this.id);
});
}

}
