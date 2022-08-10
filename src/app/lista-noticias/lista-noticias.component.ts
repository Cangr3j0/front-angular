import { Component, OnInit } from '@angular/core';
import { asyncScheduler } from 'rxjs';
import { Noticia } from '../noticia';
import { NoticiaService } from '../noticia.service';
import { Usuario } from '../usuario';

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
     this.noticiaService.findByid(1).subscribe(data=>{
      this.noticia=data;
      console.log('data from noticias: '+this.noticia.autor.name);
    })
  }
  printAutor(autor:any){
    return autor.nombre;
  }

}
