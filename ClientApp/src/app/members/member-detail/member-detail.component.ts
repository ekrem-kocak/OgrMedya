import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {
  user: User;
  userPosts: any;

  constructor(private authService: AuthService, private userService: UserService, private router: Router, private postService: PostService) { }

  ngOnInit(): void {
    this.getUser();
    this.getPosts();

  }

  getUser() {
    this.userService.getUser(this.authService.decodedToken.nameid).subscribe(user => {
      this.user = user;
      console.log(user);
    }, err => {
      console.log(err);
    })
  }

  getPosts() {
    this.postService.getUserPost(this.authService.getUserId()).subscribe(posts => {
      this.userPosts = posts;
      console.log(this.userPosts);
    })
  }

  routeEdit(userId: any) {
    this.router.navigate(["/steps",], { queryParams: { userId: userId, isUpdate: true } })
  }


}
