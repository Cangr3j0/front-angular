import { Component, forwardRef, OnInit } from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-posicionpick',
  templateUrl: './posicionpick.component.html',
  styleUrls: ['./posicionpick.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PosicionpickComponent),
      multi: true
    }
  ],
  animations: [
    trigger('aparecer', [
      state('void', style({
        background: 'none',
        opacity:0
      })),
      state('*', style({
        opacity:1,
        background: 'linear-gradient(to bottom,#0000 30%,var(--team-color,#00c8c8) 100%);'
      })),
      transition('void => *', [
        animate(2000)
      ])
    ])]
})
export class PosicionpickComponent implements ControlValueAccessor,OnInit {
positions:Array<{nombre:string,image:string,imageActive:string}>=[
{nombre:'TOP',image:'../assets/imagenes/Top_icon.png',imageActive:'../assets/imagenes/Top_icon_active.png'},
{nombre:'Jungla',image:'Jungle',imageActive:''},
{nombre:'Mid',image:'Mid',imageActive:''},
{nombre:'Adc',image:'Adc',imageActive:''},
{nombre:'Support',image:'Supp',imageActive:''}
];


  // Step 3: Copy paste this stuff here into your class
onChange: any = () => {}
onTouch: any = () => {}
registerOnChange(fn: any): void {
  this.onChange = fn;
}
registerOnTouched(fn: any): void {
  this.onTouch = fn;
}

  imgSrcTop:string;
  constructor() { }
  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    this.imgSrcTop="../assets/imagenes/Top_icon.png";
  }

}
