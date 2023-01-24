import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { Likes } from '../likes';
import { LikesService } from '../likes.service';
import { NoticiaService } from '../noticia.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

  public likes:Observable<Likes[]>;
  public id:string;
  public cantidadLikes:Observable<number>;
  constructor(private noticiaService:NoticiaService,private route:ActivatedRoute,private likesService:LikesService) {
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    this.likesService.getLikesById(this.id);
    })
    this.likes = this.likesService.getLikes;
    this.cantidadLikes=this.likesService.getCantLikes;

  }

  darLike(){
    console.log("entre en dar like D;");
    this.likesService.postLikes(this.id).subscribe(()=>{
      //next:()=>{this.likesService.getLikesById(this.id);},
      //error:(error)=>{console.log("Error:",error);}
      this.likesService.getLikesById(this.id);
    },(error)=>{console.log("Error:",error);});
    //this.likes = this.likesService.getLikes;
    //this.cantidadLikes=this.likesService.getCantLikes;

  }
}
