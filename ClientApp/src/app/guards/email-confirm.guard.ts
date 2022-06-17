import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class EmailConfirmGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  canActivate() {
    const token = localStorage.getItem('token');

    if (token) {
      this.authService.decodeToken(token);

      this.userService.getUser(this.authService.getUserId()).subscribe(user => {
        if (user.universityName == null || user.department == null || user.class == null) {
          this.router.navigate(["/steps"], { queryParams: { userId: user.id } })
        }
        return false;
      })
    }

    return true;
  }


}
