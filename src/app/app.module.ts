import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { GuardarNoticiaComponent } from './guardar-noticia/guardar-noticia.component';
import { FormsModule }   from '@angular/forms';
import { LikesComponent } from './likes/likes.component';
import { AgregarComentarioComponent } from './agregar-comentario/agregar-comentario.component';
import { NgModule } from '@angular/core';
import { AppService } from './app.service';
import { XhrInterceptor } from './xhr.interceptor';
import { BasicauthInterceptor } from './basicauth.interceptor';

const appRoutes : Routes=[
{path:'login',component:LoginComponent},
{path:'',component:ListaNoticiasComponent},
{path:'noticia/:id',component:NoticiaComponent},
{path:'publicar',component:GuardarNoticiaComponent}];
@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    ListaNoticiasComponent,
    NoticiaComponent,
    LoginComponent,
    BusquedaComponent,
    ComentarioComponent,
    GuardarNoticiaComponent,
    LikesComponent,
    AgregarComentarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    CommonModule,
    RouterModule.forRoot(appRoutes),
    SocialLoginModule,
    FormsModule
  ],
  providers: [UsuarioServiceService, AppService,{ provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true },{ provide: HTTP_INTERCEPTORS, useClass: BasicauthInterceptor, multi: true },NoticiaService, {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: true,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '358663772718-7ml94g69u9bg6g2knobbgpof2j0snrnv.apps.googleusercontent.com'
          )
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
