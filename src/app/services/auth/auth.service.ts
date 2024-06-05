import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})

export class AuthService {
 
  public  isAuthenticated$ =new BehaviorSubject<boolean>(false);
  
  private _loginUrl = 'https://dummyjson.com/auth/login';

  constructor(private _http: HttpClient) { }

  Login(username: string, password: string): Observable<any>{
    return this._http.post(this._loginUrl, { username, password }).pipe(
      map((response) => {
        // prepare the response to be handled, then return
        const responseUser: IAuthInfo = <IAuthInfo>(<any>response);
        
        localStorage.setItem('user', JSON.stringify(responseUser));
        // this.isLoggedIn = true;
        return response;
      })
    );
  }
  
  Logout(){
    localStorage.removeItem('user');
    this.isAuthenticated$.next(false)

  }
}

// user model
export interface IUser {
  email: string;
  id: string;
}
// auth model
export interface IAuthInfo {
  payload?: IUser;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number
}