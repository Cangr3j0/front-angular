import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ErrorBehavior, MensajeError } from './clases/ErrorBehavior';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  public readonly errorEmitter:BehaviorSubject<ErrorBehavior>=new BehaviorSubject<ErrorBehavior>(null);
  constructor() { 
  }
  public getError(hayError:boolean,mensajeError:MensajeError){
    this.errorEmitter.next({ hayError: hayError, mensajeError: mensajeError } as ErrorBehavior);
  }
  get getErrorObservable(){
    return this.errorEmitter.asObservable();
  }
}
