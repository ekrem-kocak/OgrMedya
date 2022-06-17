import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { EmailValidator } from '../register/email.validators';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  loggedIn: boolean = true;

  isWaiting: boolean = false;
  isSuccess: boolean = false;

  forgotForm = new FormGroup({
    // email: new FormControl("", [Validators.required, Validators.email]),
    email: new FormControl("", [Validators.required, Validators.email, EmailValidator.isValidExtension]),
  })

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(["/home"]);
    }
  }

  get email() { return this.forgotForm.get("email") };

  forgotPassword() {
    this.isWaiting = true;
    this.authService.forgotPassword(this.email.value)
      .pipe(
        finalize(() => {
          this.isWaiting = false;
        })
      )
      .subscribe(res => {
        console.log(res);
        this.isSuccess = true;
        console.log(this.isSuccess);
      }, err => {
        console.log(err);
        this.alertify.error(err)
      })
  }

}
