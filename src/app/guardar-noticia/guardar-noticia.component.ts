import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ErrorBehavior } from '../clases/ErrorBehavior';
import { Noticia } from '../clases/noticia';
import { Usuario } from '../clases/usuario';
import { ErrorService } from '../error.service';
import { NoticiaService } from '../noticia.service';
import { UsuarioServiceService } from '../usuario-service.service';


@Component({
  selector: 'app-guardar-noticia',
  templateUrl: './guardar-noticia.component.html',
  styleUrls: ['./guardar-noticia.component.css']
})
export class GuardarNoticiaComponent implements OnInit {
  autor:Usuario;
  noticia:Noticia;
  error:boolean;
  errorMensaje:string;
  errorBehavior:ErrorBehavior;
  constructor(public errorService:ErrorService,private usuarioService:UsuarioServiceService,private noticiaService:NoticiaService, private route:ActivatedRoute,private router:Router) { 
    this.noticia=new Noticia();
  }

  ngOnInit(): void {

  }

  onSubmit(guardarnoticia:NgForm){
    this.noticiaService.save(this.noticia).subscribe(resultado=>this.irANoticia());
    this.errorService.getErrorObservable.subscribe(values => {
      this.errorBehavior=values;
      console.log("VALOR ERROR BEHAVIOR "+this.errorBehavior.mensajeError);

    this.error=values.hayError;
     this.errorMensaje=values.mensajeError.error;
  });
  }
  irANoticia(): void {
    this.router.navigate(['/']);
  }
}
