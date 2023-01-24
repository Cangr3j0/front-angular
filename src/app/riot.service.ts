import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Campeon } from './campeon';
import { Hechizo } from './hechizo';
import { InfoMapa } from './info-mapa';
import { Item } from './item';
import { Participante } from './participante';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class RiotService {
  private urlMatches:string;
  constructor(private http:HttpClient) {
    this.urlMatches=environment.serverUrl+"/riot/";
   }
  encontrarMapasIdPorSummonerName(summonerName:string):Observable<string[]>{
    return this.http.get<string[]>(this.urlMatches+"partidas/"+summonerName);
  }
  encontrarParticipantesByMapaId(mapaId:string):Observable<Participante[]>{
    return this.http.get<Participante[]>(this.urlMatches+"mapa/"+mapaId);
  }
  encontrarInfoMapbySummonerName(summonerName:string):Observable<InfoMapa[]>{
    return this.http.get<InfoMapa[]>(this.urlMatches+"listapartidas/"+summonerName);
  }
  versiones(){
    return this.http.get<string>(this.urlMatches+"version");
  }
  summonersspells(key:string){
    return this.http.get<Hechizo>(this.urlMatches+"spells/"+key);
  }
  allitems(){
    return this.http.get<Item[]>(this.urlMatches+"allitems");
  }
  allchampions() {
    return this.http.get<Campeon[]>(this.urlMatches+"allchampions");
  }
}
