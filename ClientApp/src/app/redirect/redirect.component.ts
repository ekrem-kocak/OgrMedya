import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  public loading = false;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.loading = true;
    setTimeout(() => {
      this.router.navigate(["/home"]);
    }, 500);
  }

}
