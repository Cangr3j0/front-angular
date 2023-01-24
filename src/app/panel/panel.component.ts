import {Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Noticia } from '../clases/noticia';
import { NoticiaService } from '../noticia.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  noticias:Noticia[];
  @Input()noticia:Noticia=undefined;
  closeResult = '';
  constructor(private noticiaService:NoticiaService,private modalService: NgbModal) { }


  ngOnInit(): void {
    this.noticiaService.findAll().subscribe(data =>{
      this.noticias=data;
      //this.noticia = this.noticias[0];
      console.log(data);
    });
    
  }
  
  open(content:any,id:number) {
	const modalRef = this.modalService.open(content);

		console.log("el id es:"+id);

		this.noticiaService.findByid(''+id).subscribe(data=>{
			console.log(data);
			this.noticia=data;
			modalRef.componentInstance.noticia = data;
			console.log(modalRef.componentInstance.noticia);
		}
		);

	}

	private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return `with: ${reason}`;
		}
	}


}
