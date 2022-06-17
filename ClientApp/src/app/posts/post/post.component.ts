import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { PostDetailComponent } from './post-detail/post-detail.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  @Input() item: any;
  user: User;
  likedPosts: any;

  constructor(private userService: UserService, private dialog: MatDialog, private authService: AuthService, private router: Router, private postService: PostService) {
  }

  ngOnInit(): void {
    this.userService.getUser(this.item.userId).subscribe(user => {
      this.user = user;
    })

    this.postService.getLikedPostByUserId(this.authService.getUserId()).subscribe(res => {
      this.likedPosts = res;
    })

    console.log(this.item);

  }

  openContent() {
    var tempLikeCount = this.item.likeCount;
    const dialogRef = this.dialog.open(PostDetailComponent, {
      width: "600px",
      data: this.item
    });

    dialogRef.afterClosed().subscribe(result => {
      var likeCount = result.event.likeCount;
      let item = document.getElementById("mat-card-" + result.event.id).children[3].children[1];
      if (likeCount > tempLikeCount) {
        item.className = "btn btn-sm btn-danger d-flex align-items-center";
        item.children[1].textContent = "-1";
      } else if (likeCount < tempLikeCount) {
        item.className = "btn btn-sm btn-success d-flex align-items-center";
        item.children[1].textContent = "+1";
      }
    });
  }

  route(userId: number) {
    var myid = this.authService.getUserId();
    if (myid == userId) {
      this.router.navigate(["/member-detail"]);
    } else {
      this.router.navigate(["/members/" + userId])
    }
  }

  like(event: any) {
    var x = event.target;
    var count = document.getElementById("likeCount");
    if (x.classList.contains("btn-success")) {
      // like
      x.className = "btn btn-sm btn-danger d-flex align-items-center";
      x.children[1].textContent = "-1";

      this.item.likeCount += 1;
      this.postService.likePost(this.item.id, this.authService.getUserId()).subscribe();
    } else {
      // remove like
      x.className = "btn btn-sm btn-success d-flex align-items-center";
      x.children[1].textContent = "+1";
      this.item.likeCount -= 1;
      this.postService.dislikePost(this.item.id, this.authService.getUserId()).subscribe();
    }
  }

  isLikedPost(postId: number) {
    if (postId && this.likedPosts) {
      return this.likedPosts.findIndex((i: any) => i.likedPostId == postId) > -1 ? true : false;
    }
    return false;
  }

  isShowDeleteButton(item: any) {
    return item?.userId == this.authService.getUserId() ? true : false;
  }

  deletePost(postId:number) {
    this.postService.deletePost(postId).subscribe(res=>{
      console.log(res);
      window.location.reload();
    })
  }
}
