import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NoticiaService } from '../noticia.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {

  public likes:number;
  public id:string;
  constructor(private noticiaService:NoticiaService,private route:ActivatedRoute) {
   }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id');
    this.noticiaService.getLikes(this.id).subscribe(data=>{
      this.likes=data;
    });
    })
  }

}
