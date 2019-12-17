import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { map, tap } from 'rxjs/operators';

interface AuthResponseData{
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  expiresIn: string;
  registered: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated = false;
  userId: string;
  private _user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) { }

  get isAuthenticate(){
    return this._user.asObservable().pipe(map(user => {
      if(user){
        return !!user._token;
      }else{
        return null;
      }
    }));
  }

  signup(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebase.apiKey}`,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      tap(userData => {
        const expTime = new Date(new Date().getTime() + (+userData.expiresIn * 1000));
        this._user.next(new User(userData.localId, userData.email, userData.idToken, expTime));
      })
    );
  }

  setUser(userId: string){
    this.userId = userId;
    this.isAuthenticated = true;
  }

  login(email: string, password: string) {
    //firebase login API here
    return this.http.post<AuthResponseData>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebase.apiKey}`,
    {
      email,
      password,
      returnSecureToken: true
    });
  }

  logout(){
    this._user.next(null);
  }
}
