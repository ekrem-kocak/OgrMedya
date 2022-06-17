import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AlertifyService } from '../services/alertify.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {

  users: User[];
  followParams: string = "followings";
  public loading = false;

  constructor(private userService: UserService,
    private alertify: AlertifyService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers(this.followParams).subscribe(users => {
      this.users = users;
      this.loading = false;
    }, err => {
      this.alertify.error(err);
      this.loading = false;
    })
  }

  unfollow(userId: number) {
    console.log("unfollow");
    this.userService.unfollowUser(this.authService.getUserId(), userId).subscribe(res => {
      console.log(res);
      console.log(this.users.findIndex(i => i.id == userId));
      this.users.splice(this.users.findIndex(i => i.id == userId), 1);
    })
  }

}
