import { Component, OnInit } from '@angular/core';
import { SocialAuthService, SocialUser } from "@abacritt/angularx-social-login";
import { FacebookLoginProvider } from "@abacritt/angularx-social-login";
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { ErrorService } from '../error.service';
import { Observable } from 'rxjs';
import { ErrorBehavior } from '../clases/ErrorBehavior';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username:any;
  password:any;
  user: SocialUser;
  loggedIn: boolean;
  error:boolean=false;
  errorMensaje:string;
  errorBehavior:ErrorBehavior;
  constructor(private errorService:ErrorService,private authService: SocialAuthService,private app:AppService,private router: Router) { }

  ngOnInit(): void {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
  login() {
    this.app.authenticate(this.username,this.password, () => {
      this.router.navigateByUrl('/');
  });
  this.errorService.getErrorObservable.subscribe(values => {
    this.errorBehavior=values;
    console.log("VALOR ERROR BEHAVIOR "+this.errorBehavior.mensajeError.error);

  this.error=values.hayError;
  //httpservletresponse
   this.errorMensaje=values.mensajeError.error;
});

  return false;

  }

}
