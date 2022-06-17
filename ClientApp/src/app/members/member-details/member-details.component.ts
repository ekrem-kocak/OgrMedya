import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})
export class MemberDetailsComponent implements OnInit {

  user?: User;
  followingUsers: User[];
  followText: string = "";
  userPosts: any;

  constructor(private userService: UserService, private alertifyService: AlertifyService, private route: ActivatedRoute, private authService: AuthService, private postService: PostService) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    var paramId = +this.route.snapshot.params['id'];
    this.userService.getUser(paramId).subscribe(user => {
      this.user = user;
      this.postService.getUserPost(user.id).subscribe(posts => {
        this.userPosts = posts;
        console.log(this.userPosts);
      })

      this.userService.getUsers("followings").subscribe(followings => {
        if (followings.findIndex(i => i.id == this.user.id) > -1) {
          this.followText = "Takipten Çık";
        } else {
          this.followText = "Takip Et";
        }
        this.followingUsers = followings;
      }, err => {
        console.log(err);
      })

    }, err => {
      this.alertifyService.error(err);
    });
  }


  followOrUnfollow(userId: number, event: any) {
    if (event.target.textContent == "Takipten Çık") {
      this.unfollow(userId);
    }
    else {
      this.followUser(userId);
    }
  }

  followUser(userId: number) {
    this.userService.followUser(this.authService.getUserId(), userId).subscribe(res => {
      this.followText = "Takipten Çık";
    }, err => {
    })
  }

  unfollow(userId: number) {
    this.userService.unfollowUser(this.authService.getUserId(), userId).subscribe(res => {
      this.followText = "Takip Et";
    }, err => {
    })
  }

}
