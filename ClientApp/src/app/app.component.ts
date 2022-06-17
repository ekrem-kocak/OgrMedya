import { Component, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';

import { JwtHelperService } from "@auth0/angular-jwt";
import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

import { strings as turkishStrings } from 'ngx-timeago/language-strings/tr';
import { TimeagoIntl } from 'ngx-timeago';

const helper = new JwtHelperService();

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private authService: AuthService, private userService: UserService, private router: Router, intl: TimeagoIntl) {
    intl.strings = turkishStrings;
    intl.changes.next();
  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    this.authService.decodeToken(token);
    // if (token) {

    //   this.userService.getUser(this.authService.decodeToken(token)).subscribe(user => {
    //     console.log(user);
    //     if (user.universityName == null || user.department == null || user.class == null) {
    //       this.router.navigate(["/steps"], { queryParams: { userId: user.id } })
    //     }
    //   })
    // }
  }

  loggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token ? true : false;
  }


}
