import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { Item } from './item';

@Directive({
  selector: '[appItem]'
})
export class ItemDirective {
  @Input() clicked:boolean=false;
  @Input() itemSeleccionado: Item;

  constructor(private el: ElementRef) { }

  @HostListener('click') onClick(){
    // [campeonSeleccionado]="campeon" (campeonEvent)="seleccionarCampeon($event)"
    // [campeonSeleccionado]="campeon"  es el input de shadowdirective, osea el campeon seleccionado se guarda
    // en la variable input campeonSeleccionado.
    // En shadowDirective.ts veremos  this.campeonEvent.emit(this.campeonSeleccionado); esto emite el output del campeon seleccionado
    // Para poder atrapar el campeon desde otro componente (campeonEvent)="seleccionarCampeon($event)"
    // donde campeonEvent es el emitter con el @Output y "seleccionarCampeon($event)" es la funcion en el
    // componente
    if(!this.clicked){
    this.clicked=true;
    this.margin("3px solid yellow");
    this.shadow(null);
    }else{
      this.clicked=false;
      this.margin(null);
      this.shadow(null);
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
