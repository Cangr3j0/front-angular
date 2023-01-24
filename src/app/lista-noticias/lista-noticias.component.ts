import { Component, OnInit } from '@angular/core';
import { asyncScheduler } from 'rxjs';
import { Noticia } from '../clases/noticia';
import { NoticiaService } from '../noticia.service';
import { Usuario } from '../clases/usuario';
import { Autor } from '../clases/autor';
import { AppService } from '../app.service';
import { UsuarioServiceService } from '../usuario-service.service';

@Component({
  selector: 'app-lista-noticias',
  templateUrl: './lista-noticias.component.html',
  styleUrls: ['./lista-noticias.component.css']
})
export class ListaNoticiasComponent implements OnInit {
  noticias:Noticia[];
  noticia:Noticia;
  autor:Autor;
  format:string ="dd/MM/yyyy";
  lastusers:Usuario[];
  constructor(private usersService:UsuarioServiceService,private noticiaService:NoticiaService,private app:AppService) { 

  }

  ngOnInit(): void {
    this.noticiaService.findAll().subscribe(data =>{
      this.noticias=data;
      console.log(data);
    });
    this.usersService.getLastUsers().subscribe(data=>{
      this.lastusers=data;
    })
  }
  printAutor(autor:any){
    return this.noticia.autor.nombre;
  }
  authenticated() { 
    return this.app.isUserLoggedIn(); 
  }
  
}
