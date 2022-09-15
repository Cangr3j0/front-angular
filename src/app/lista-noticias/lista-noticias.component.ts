import { Component, OnInit } from '@angular/core';
import { asyncScheduler } from 'rxjs';
import { Noticia } from '../clases/noticia';
import { NoticiaService } from '../noticia.service';
import { Usuario } from '../clases/usuario';

@Component({
  selector: 'app-lista-noticias',
  templateUrl: './lista-noticias.component.html',
  styleUrls: ['./lista-noticias.component.css']
})
export class ListaNoticiasComponent implements OnInit {
  noticias:Noticia[];
  noticia:Noticia;
  autor:Usuario;
  constructor(private noticiaService:NoticiaService) { 

  }

  ngOnInit(): void {
    this.noticiaService.findAll().subscribe(data =>{
      this.noticias=data;
      console.log(data);
    })
  }
  printAutor(autor:any){
    return autor.nombre;
  }

}
