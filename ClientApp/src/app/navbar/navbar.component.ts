import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from '../app.component';
import { HomeComponent } from '../home/home.component';
import { User } from '../models/user';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  constructor(public authService: AuthService, private router: Router, private alertifyService: AlertifyService) { }

  ngOnInit(): void {
    var token = localStorage.getItem('token');
  }

  login(): void {
    var user: any = {
      userName: this.loginForm.get('username')?.value,
      password: this.loginForm.get('password')?.value
    }
    this.authService.login(user).subscribe(res => {
      console.log(res);
      this.router.navigate(["/redirect"]);
      this.alertifyService.success("Hoşgeldin " + this.authService.getUsername());
    }, err => {
      this.alertifyService.error("Kullanıcı adı veya şifre yanlış");
    })
  }

  logout(): void {
    console.log("logout");
    this.alertifyService.error("Çıkış Başarılı");
    localStorage.removeItem('token');
    this.router.navigate(["/redirect"]);
  }

  loggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
