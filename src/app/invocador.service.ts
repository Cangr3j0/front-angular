import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
export interface Invocador {
  id: string;
  accountId:string;
  name: string;
  profileIconId :number;
  summonerLevel:number;
}
@Injectable({
  providedIn: 'root'
})
export class InvocadorService {
  public url="https://cors-anywhere.herokuapp.com/https://la2.api.riotgames.com/lol/summoner/v4/summoners/by-name/";
  invocador!: Invocador;
  constructor(private httpClient: HttpClient) { }

  public getInvocador(nick:string):Observable<Invocador> { 
    const headers= new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Origin', 'https://developer.riotgames.com')
  .set('Access-Control-Allow-Origin', '*')
  .set("Access-Control-Allow-Credentials", "true")
   return this.httpClient.get<Invocador>(this.url+nick+"?api_key=RGAPI-ff93b32a-7558-4142-b0a0-46db65503bff",{ headers: headers}).pipe();
   }
}
