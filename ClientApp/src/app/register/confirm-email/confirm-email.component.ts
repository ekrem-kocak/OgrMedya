import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.scss']
})
export class ConfirmEmailComponent implements OnInit {

  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }


  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params); // { orderby: "price" }
      this.authService.confirmEmail(params.userId, params.token)
        .subscribe(res => {
          console.log(res);

          this.authService.login({ username: params.username, password: params.password }).subscribe(res => {
            console.log(res);
            setTimeout(() => {
              this.router.navigate(["/steps"], { queryParams: { userId: params.userId } });
            }, 3000);
          }, err => {
            console.log(err);
          })
        })
    });



  }

}
