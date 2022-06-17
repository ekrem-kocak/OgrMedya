import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { User } from '../../models/user';
import { AlertifyService } from '../../services/alertify.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.scss']
})
export class MemberListComponent implements OnInit {

  users: User[] = [];
  viewedUsers: User[] = [];
  followingUsers: User[] = [];
  public loading = false;

  constructor(private userService: UserService, private alertifyService: AlertifyService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  followUser(userId: number) {
    this.userService.followUser(this.authService.getUserId(), userId).subscribe(res => {
      this.viewedUsers.splice(this.viewedUsers.findIndex(i => i.id == userId), 1);
    }, err => {
    })
  }

  getUsers() {
    this.loading = true;
    this.userService.getUsers("followings").subscribe(followings => {
      this.userService.getUsers().subscribe(users => {
        users = users.filter(val => !followings.find(i => i.id == val.id));
        this.users = users.filter(i => i.universityName != null);
        this.viewedUsers = users.filter(i => i.universityName != null);
        this.loading = false;

      }, err => {
        this.loading = false;
      })
    }, err => {
      this.loading = false;
    })
  }

  search(event: any) {
    var filter: string = event.target.value.toLowerCase();
    this.viewedUsers = this.users.filter(
      i => i.name?.toLowerCase().includes(filter)
        || i.userName?.toLowerCase().includes(filter)
        || i.introduction?.toLowerCase().includes(filter)
        || i.universityName?.toLowerCase().includes(filter)
        || i.department?.toLowerCase().includes(filter));
  }
}
