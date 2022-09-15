import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Comentario } from '../clases/comentario';
import { ComentarioService } from '../comentario.service';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css']
})
export class ComentarioComponent implements OnInit {

  public comentarios:Comentario[];
  public id:string;
  public cantComentarios:number;
  constructor(private comentarioService:ComentarioService,private route:ActivatedRoute) { }
  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.comentarioService.findByid(this.id).subscribe(data =>{
        this.comentarios=data;
        console.log(data);
      })
      this.comentarioService.cantComentariosById(this.id).subscribe(data=>{
        this.cantComentarios=data;
      })
    });
  }

}
