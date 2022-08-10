import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { UserListComponent } from './user-list/user-list.component';
import { UsuarioServiceService } from './usuario-service.service';
import { ListaNoticiasComponent } from './lista-noticias/lista-noticias.component';
import { NoticiaService } from './noticia.service';
import { CommonModule } from '@angular/common';
import { NoticiaComponent } from './noticia/noticia.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { SocialLoginModule, SocialAuthServiceConfig } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { ComentarioComponent } from './comentario/comentario.component';


const appRoutes : Routes=[{path:'login',component:LoginComponent},{path:'',component:ListaNoticiasComponent}];
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ListaNoticiasComponent,
    NoticiaComponent,
    LoginComponent,
    BusquedaComponent,
    ComentarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    SocialLoginModule
  ],
  providers: [UsuarioServiceService,NoticiaService, {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '358663772718-7ml94g69u9bg6g2knobbgpof2j0snrnv.apps.googleusercontent.com'
          )
        },
        {
          id: FacebookLoginProvider.PROVIDER_ID,
          provider: new FacebookLoginProvider('dc2ae0ad2e73769bd3b794ac23fe9c98')
        }
      ],
      onError: (err) => {
        console.error(err);
      }
    } as SocialAuthServiceConfig,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
