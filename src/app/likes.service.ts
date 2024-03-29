import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Likes } from './likes';

@Injectable({
  providedIn: 'root'
})
export class LikesService {
  private url=environment.serverUrl+"/likes/"
  public readonly likesObserver:BehaviorSubject<Likes[]>=new BehaviorSubject<Likes[]>([]);
  public readonly cantLikesObserver:BehaviorSubject<number>=new BehaviorSubject<number>(0);
  constructor(private http:HttpClient) { }

  public getLikesById(id:string){
    this.http.get<Likes[]>(this.url+id).subscribe(data =>{
      this.likesObserver.next(data);
      this.cantLikesObserver.next(data.length);
    });
  }
  public postLikes(idnoticia:string):Observable<Likes[]>{
   return this.http.post<Likes[]>(this.url+idnoticia,idnoticia).pipe(catchError(this.handleError));
  }
  get getLikes():Observable<Likes[]>{
    return this.likesObserver.asObservable();
  }
  get getCantLikes():Observable<number>{
    return this.cantLikesObserver.asObservable();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Return an observable with a user-facing error message.
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
