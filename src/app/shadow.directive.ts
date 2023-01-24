import { AfterViewInit, Directive, ElementRef, EventEmitter, HostListener, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Campeon } from './campeon';

@Directive({
  selector: '[appShadow]'
})
export class ShadowDirective{
  columna:any;
  elseleccionadoanterior:any;
  arrayelementos:any[]=[];
  @Input() campeonSeleccionado: Campeon;
  @Output() elementEvent:EventEmitter<ElementRef>=new EventEmitter<ElementRef>();
  @Output() campeonEvent:EventEmitter<Campeon>=new EventEmitter<Campeon>();
  @Input() clicked:boolean=false;


  constructor(private el: ElementRef) { 

  }
  
  @HostListener('click') onClick(){
    // [campeonSeleccionado]="campeon" (campeonEvent)="seleccionarCampeon($event)"
    // [campeonSeleccionado]="campeon"  es el input de shadowdirective, osea el campeon seleccionado se guarda
    // en la variable input campeonSeleccionado.
    // En shadowDirective.ts veremos  this.campeonEvent.emit(this.campeonSeleccionado); esto emite el output del campeon seleccionado
    // Para poder atrapar el campeon desde otro componente (campeonEvent)="seleccionarCampeon($event)"
    // donde campeonEvent es el emitter con el @Output y "seleccionarCampeon($event)" es la funcion en el
    // componente
    
    this.clicked=true;
    this.margin("3px solid yellow");
    this.shadow(null);
    console.log("clicked: "+this.clicked);
    console.log("campeon seleccionado: "+this.campeonSeleccionado.name);
    this.campeonEvent.emit(this.campeonSeleccionado);
    this.arrayelementos.push(this.el.nativeElement);
    var div = this.el.nativeElement.parentElement.firstChild.parentElement.parentElement.parentElement.parentElement.parentElement;
    console.log(div);
    console.log("ver propiedades "+this.arrayelementos);
    for (let i = 0; i < this.arrayelementos.length; i++) {
      console.log(this.arrayelementos[i].tagName);
    }
    this.columna=this.el.nativeElement.parentElement.firstChild.parentElement.parentElement;
    for (let i = 0; i < this.columna.childNodes.length; i++) {
      if(this.columna.childNodes[i].querySelector('img')){

      
        if(this.columna.childNodes[i].querySelector('img')!=this.el.nativeElement.parentElement.querySelector('img')){
        this.columna.childNodes[i].querySelector('img').style.margin="";
        this.columna.childNodes[i].querySelector('img').style.border="";
      }
    }
}
   

}

  @HostListener('mouseenter') onMouseEnter() {
    if(!this.clicked){
    this.shadow('0px -1px 53px 18px rgba(225,39,242,1)');
    this.margin('2px solid white');}
  }

  @HostListener('mouseleave') onMouseLeave() {
    if(!this.clicked){
    this.shadow(null);
    this.margin(null);}

  }

  shadow(color:string){
    this.el.nativeElement.style.boxShadow = color;
  }
  margin(color:string){
    this.el.nativeElement.style.border = color;
  }
}
