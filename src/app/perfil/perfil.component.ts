import { Component, OnInit } from '@angular/core';
import { delay, Observable, retry, Subject } from 'rxjs';
import { InfoMapa } from '../info-mapa';
import { Participante } from '../participante';
import { Partida } from '../partida';
import { RiotService } from '../riot.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  public summonerspellsinfo:any;
  public versiones:string[]=[];
  public version:string;
  public partidas:Partida[]=[];
  public participantes:Participante[];
  public infomapa:InfoMapa[]=[];
  public infomapasubject:Subject<InfoMapa[]>=new Subject<InfoMapa[]>();
  public participantessubject:Subject<Participante[]>=new Subject<Participante[]>();
  public observableinfomapa:Observable<InfoMapa[]>;
  public valor:any;
  constructor(public riotService:RiotService) { }

  ngOnInit(): void {
    this.riotService.encontrarInfoMapbySummonerName("shinradalila").subscribe(data=>{
      this.infomapa=data;

      console.log(this.infomapa);
    });
    this.riotService.versiones().subscribe(data=>{
      this.version=data;
      this.riotService.summonersspells(this.versiones[0]).subscribe(data=>{
        this.summonerspellsinfo=data;
        this.valor=this.getSummonerSpell(this.summonerspellsinfo,14);
        console.log(this.valor['name']);
      });


    });


  }

  getSummonerSpell(myDictionary:any,idspell:any):any{
    console.log(myDictionary);
    Object.keys(myDictionary).forEach(key => {
      let value = myDictionary[key];
      console.log("Valor de valuee "+JSON.parse(value));
    });
    for (let key in myDictionary) {
      console.log("valor de mydictionary: "+myDictionary);
      console.log("valor de mydictionarykeykey "+myDictionary[key]['key']['name']);
      if(myDictionary[key]['key']==idspell){
        console.log("valor de mydictionary: "+myDictionary[key]['key']);
     return myDictionary['key'];}

  }
  }
  getParticipantes(matchId:string):Array<Participante>{
    console.log("entre en participantes");
    this.riotService.encontrarParticipantesByMapaId(matchId).subscribe(data=>{
      this.participantes=data;
      console.log("entre en participantes");
      console.log(this.participantes);
      return data;
    });
    return this.participantes;
  }

  // getInfoMapas():Observable<InfoMapa[]>{
  //   this.riotService.encontrarMapasIdPorSummonerName("shinradalila").pipe(
  //     retry(3), // you retry 3 times
  //     delay(1000) // each retry will start after 1 second,
  //  ).subscribe(data=>{
  //     console.log("entre");
  //     for(var index in data){
  //       console.log(data[index]);
  //       let mapa=new InfoMapa();
  //       mapa.matchId=data[index];
  //       let participantesdata=this.getParticipantes(mapa,data[index]);
  //       console.log("Participante data: "+participantesdata);
  //       // for(var index in participantesdata){
  //         mapa.participantes=participantesdata[index]);
  //       // }
  //       this.infomapa.push(mapa);
  //       // this.partidas[index].matchId='';
  //       // this.partidas[index].matchId=data[index];
  //       // this.partidas[index].participantes.push=this.getParticipantes(data[index]);
  //       this.infomapasubject.next(this.infomapa);
  //     }
  //   }
  //  );
  //  return this.infomapasubject.asObservable();
  // }
}
