import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { UserForResetPassword } from '../models/user-for-resetPassword';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private route: Router) { }

  model: any;
  isSuccess: boolean = false;

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.route.navigate(["/home"]);
    }

    this.activatedRoute.queryParams.subscribe(params => {
      console.log(params);
      let token = params.token;
      token = token.replaceAll(" ", "+");
      this.model = {
        token: token,
        userId: params.userId
      }
    })
  }

  resetPasswordForm = new FormGroup({
    password: new FormControl("", [Validators.required, Validators.minLength(5), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@_$!%*?&])[A-Za-z\d$@$!%*?&].{0,}')]),
    rePassword: new FormControl("", [Validators.required, Validators.minLength(5), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@_$!%*?&])[A-Za-z\d$@$!%*?&].{0,}')]),
  })

  get password() { return this.resetPasswordForm.get('password') };
  get rePassword() { return this.resetPasswordForm.get('rePassword') };

  resetPassword() {
    var model: UserForResetPassword = {
      userId: this.model.userId,
      token: this.model.token,
      password: this.password?.value
    }
    this.authService.resetPassword(model).subscribe((res: any) => {

      this.isSuccess = true;

      setTimeout(() => {
        this.authService.login({ username: res.username, password: this.password?.value }).subscribe(res => {
          console.log(res);
          this.route.navigate(["/members"]);
        })
      }, 6000);


    })
  }

  isRePasswordTrue(): boolean {
    if (this.password?.valid && this.rePassword?.dirty) {
      return this.password.value == this.rePassword?.value;
    }
    return true;
  }


}
