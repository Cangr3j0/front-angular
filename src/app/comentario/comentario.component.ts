import { Component, OnInit, Optional } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable } from 'rxjs';
import { Comentario } from '../clases/comentario';
import { ComentarioService } from '../comentario.service';
import { animate, keyframes, query, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-comentario',
  templateUrl: './comentario.component.html',
  styleUrls: ['./comentario.component.css'],
  animations: [
    trigger('desvanecer', [
      state('desvanecerState', style({
        opacity: '1',
      })),
      transition('* => *', [
        style({ opacity: '0', transform: 'translateY(20px)' }),
        animate('500ms'),
      ])
    ]),
    trigger("miAnimacion", [
      transition('*=>animar',[
        query('.una_clase',[animate("1s", style({ background: "red" }))],{optional:true})
       
      ])
    ])]
})
export class ComentarioComponent implements OnInit {
  exp='';
  desvanecerAnimacion:boolean=true;
  estadoAnimacion:string='desvanecerState';
  isOpen = true;
  public comentariosStatic:Comentario[]=[];
  public comentarios: Observable<Comentario[]>;
  public id: string;
  public cantComentarios: number;
  contenido: any;
  constructor(private comentarioService: ComentarioService, private route: ActivatedRoute) { }
  ngOnInit(): void {

    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
      this.comentarioService.findByid(this.id);
      this.comentarios = this.comentarioService.getComentarios;
      this.comentarioService.cantComentariosById(this.id).subscribe(data => {
        this.cantComentarios = data;
      })
    });
    this.comentarioService.getComentarios.subscribe(data=>{
      this.comentariosStatic=data;
    })
  }
  postearComentario() {
    if (this.desvanecerAnimacion) {
      // Enabling Animation
      this.desvanecerAnimacion = !this.desvanecerAnimacion;
    }
    let nuevoComentario: Comentario;
    console.log(this.contenido);
    this.comentarioService.postCommentary(this.contenido, this.id).subscribe(() => {
      this.comentarioService.findByid(this.id);
      this.contenido = "";
    });
  }
  toggle() {
    console.log("entre en toggle");
    this.exp=='animar'?this.exp='':this.exp="animar";
  }

}
