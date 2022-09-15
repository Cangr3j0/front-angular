import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Noticia } from '../clases/noticia';
import { Usuario } from '../clases/usuario';
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
  constructor(private usuarioService:UsuarioServiceService,private noticiaService:NoticiaService, private route:ActivatedRoute,private router:Router) { 
    this.noticia=new Noticia();
  }

  ngOnInit(): void {
    this.usuarioService.findById(1).subscribe((res: Usuario) => {
      this.autor = res; this.noticia.autor=this.autor;
      console.log( this.noticia.autor);
    });
    console.log( this.noticia);
  }

  onSubmit(guardarnoticia:NgForm){
    this.noticiaService.save(this.noticia).subscribe(resultado=>this.irANoticia());
  }
  irANoticia(): void {
    this.router.navigate(['/']);
  }
}
