import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-soloqrank',
  templateUrl: './soloqrank.component.html',
  styleUrls: ['./soloqrank.component.css']
})
export class SoloqrankComponent implements OnInit {
  public division:string;
  constructor(private _Activatedroute:ActivatedRoute) { }

  ngOnInit(): void {
     this._Activatedroute.paramMap.subscribe(params => {
      this.division = params.get('division');
  });;
  }

}
