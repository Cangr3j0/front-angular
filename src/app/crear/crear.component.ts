import { AfterViewInit, Component, ElementRef, Input, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Item } from '../item';
import { RiotService } from '../riot.service';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { Campeon } from '../campeon';
import { ShadowDirective } from '../shadow.directive';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css'],
  styles: [
    `
			.my-custom-class .popover-header{
				background: black;
				font-size: 125%;
			}
			.my-custom-class .arrow::after {
				border-top-color: aliceblue;
			}
		`,

  ],
  animations:[trigger('desvanecerCampeon',[
    state('irse',style({height:'0',opacity:0})),
    state('volver',style({height:'*',opacity:1})),
    transition('volver=>irse',animate(2000))
  ])]
})
export class CrearComponent implements OnInit {
public exp="volver";
  @Input() boxshadow:string='0px 0px 10.5px #000';
public items:Item[];
public seleccionado:boolean=false;
public campeones:Campeon[];
public campeonSeleccionado:Campeon;
public itemSeleccionado:Item;
@ViewChildren(ShadowDirective) viewChildren!: QueryList<ShadowDirective>;
 @ViewChild("itemsScroll") itemsScroll: ElementRef;
 @ViewChild("campeonScroll") campeonScroll: ElementRef;
  constructor(public riotService:RiotService,private router: Router) { }



  ngOnInit(): void {

    this.riotService.allitems().subscribe(data=>{
      this.items=data;
      for(var val of this.items){
        let descripcion=val.description;
        let reemplazado=descripcion.replace(/<attention>/g,"").replace("</attention>","").replace("<stats>","").replace("</stats>","")
        .replace("<mainText>","").replace("</mainText>","").replace("<br>","").replace("</br>","").replace(/<\/?[^>]+(>|$)/g, " ");
        
        val.description=reemplazado;
      }
    });
    this.riotService.allchampions().subscribe(data=>{
      this.campeones=data;
    })
  }

  seleccionarCampeon(campeon:Campeon){
    this.campeonSeleccionado=campeon;
  }
  seleccionar(){
    this.exp="irse";
    this.seleccionado=true;
    this.itemsScroll.nativeElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }
  
  elegirOtraVez(){
    this.seleccionado=false;
    this.campeonScroll.nativeElement.scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
  }
}
