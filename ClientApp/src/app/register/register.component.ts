import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserForRegister } from '../models/user-for-register';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { EmailValidator } from './email.validators';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public loading = false;

  registerForm = new FormGroup({
    name: new FormControl("", [Validators.required, Validators.minLength(3)]),
    password: new FormControl("", [Validators.required, Validators.minLength(5), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.$@_$!%*?&])[A-Za-z\d$@$!%*?&].{0,}')]),
    rePassword: new FormControl("", [Validators.required, Validators.minLength(5), Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@_$!%*?&])[A-Za-z\d$@$!%*?&].{0,}')]),
    username: new FormControl("", [Validators.required, Validators.pattern('^(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$')]),
    email: new FormControl("", [Validators.required, Validators.email]),
    // email: new FormControl("", [Validators.required, Validators.email, EmailValidator.isValidExtension]),
    gender: new FormControl("male", Validators.required),
  })

  constructor(private authService: AuthService, private router: Router, private alertifyService: AlertifyService) { }

  ngOnInit(): void {
  }

  register() {
    this.loading = true;
    var newUser: UserForRegister = {
      name: this.registerForm.get('name')?.value,
      username: this.registerForm.get('username')?.value,
      email: this.registerForm.get('email')?.value,
      password: this.registerForm.get('password')?.value,
      gender: this.registerForm.get('gender')?.value,
    }

    this.authService.register(newUser).subscribe(res => {
      console.log(res);
      this.router.navigate(['/last-one-step']);
      this.loading = false;
    }, err => {
      this.alertifyService.error(err);
      this.loading = false;
    });
  }

  get name() { return this.registerForm.get('name') };
  get username() { return this.registerForm.get('username') };
  get email() { return this.registerForm.get('email') };
  get password() { return this.registerForm.get('password') };
  get rePassword() { return this.registerForm.get('rePassword') };

  isRePasswordTrue(): boolean {
    if (this.password?.valid && this.rePassword?.dirty) {
      return this.password.value == this.rePassword?.value;
    }
    return true;
  }
}
