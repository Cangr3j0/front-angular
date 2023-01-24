import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invocador, InvocadorService } from './invocador.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { AppService } from './app.service';
import { Usuario } from './clases/usuario';

declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public usuarioObserver:Observable<Usuario>;
  public usuario:Usuario;
  public nombreUsuario$:Observable<string>;
  public nameUser:string;
  user: SocialUser;
  loggedIn: boolean;
  title = 'lolweb';

  public invocador!: Invocador;
  public nombreInvocador!: string;
  public profileIconId: number = null;
  public nivel!: number;
  public errorNoencontrado!: string;
  public showSpinner = false;
  public esBahiense = false;
  public error = false;
  public mensajeError : string;
  public test:string="asd";
  constructor(public invocadorService: InvocadorService,private route: ActivatedRoute,public router: Router,
    private authService: SocialAuthService,private app:AppService) {
  }
  authenticated() { 
    return this.app.isUserLoggedIn(); 
  }

  ngOnInit() {
    this.invocadorService.getInvocador("kuroloniichannn");
    this.route.queryParams.subscribe(params => {
      this.test = params['test'];
    });
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });

    console.log("usuarioo1: "+this.usuarioObserver);
    if(this.authenticated){
      this.app.getUserSession();
      this.nombreUsuario$=this.app.getUsuarioSession;
      this.nombreUsuario$.subscribe(data=>{
        this.nameUser=data;
      })
    }
  }
  buscar(invocadortexto: HTMLInputElement) {
    if (invocadortexto.value != "") {
      this.showSpinner = true;
    }
    this.error =false;
    this.nombreInvocador = "";
    this.profileIconId = null;
    this.nivel = null;
    console.log("ENTRE AL BUSCAR " + invocadortexto.value);
    this.invocadorService.getInvocador(invocadortexto.value).subscribe(data => {

      this.showSpinner = false;
      this.invocador = data;
      this.nombreInvocador = this.invocador.name;
      this.profileIconId = this.invocador.profileIconId;
      this.nivel = this.invocador.summonerLevel;

    },
      err => {
        if (err.status == 404) {
          /// you can check for any status like 404 not found 
          this.showSpinner = false;
          this.error = true;
          this.mensajeError="No se encontro el invocador";
        }
        if (err.status == 403 && this.nombreInvocador != "") {
          this.showSpinner = false;
          this.error = true;
          this.mensajeError="No se encontro el invocador";
        }
        this.showSpinner = false;
        this.error = true;
        this.mensajeError="Hubo un error al intentar realizar la conexión";
      })
  };

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
  desconectar():void{
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('token');
    this.app.setAuthenticated(false);
    this.usuario=null;
   // this.router.navigate(['/login'])
  }
}
