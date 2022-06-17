import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { UserForRegister } from '../models/user-for-register';

import { JwtHelperService } from "@auth0/angular-jwt";
import { UserForLogin } from '../models/user-for-login';
import { UserForResetPassword } from '../models/user-for-resetPassword';
import { AlertifyService } from './alertify.service';

const helper = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url: string = "https://api.sosyaluniversiteli.tk/api/auth/"
  decodedToken: any;

  constructor(private http: HttpClient, private alertifyService: AlertifyService) { }

  login(user: UserForLogin): Observable<string> {
    return this.http.post<string>(this.url + 'login', user).pipe(
      map((response: any) => {
        localStorage.setItem('token', response.token);
        this.decodeToken(response.token);
        this.getUsername();
        return response.token;
      })
    );
  }

  register(user: UserForRegister) {
    return this.http.post(this.url + 'register', user).pipe(
      map(res => {
        console.log(res);
      })
    )
  }

  confirmEmail(userId: string, token: string) {
    return this.http.post(this.url + "confirm?userId=" + userId + "&token=" + token, {});
  }

  forgotPassword(email: string) {
    return this.http.post(this.url + "forgotPassword", { email: email });
  }

  resetPassword(model: UserForResetPassword) {
    return this.http.post(this.url + "resetPassword", model);
  }

  isLoggedIn(status?: boolean): boolean {
    const token = localStorage.getItem('token');
    if (token)
      return !helper.isTokenExpired(token!);
    return false;
  }

  getUsername(): string {
    return this.decodedToken.unique_name;
  }

  getUserId() {
    return this.decodedToken.nameid;
  }

  decodeToken(token: string) {
    this.decodedToken = helper.decodeToken(token);
  }
}
