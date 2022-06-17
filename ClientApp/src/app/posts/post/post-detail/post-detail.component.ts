import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit, OnDestroy {

  user: User;
  likedPosts: any;

  constructor(
    public dialogRef: MatDialogRef<PostDetailComponent>,
    @Optional()
    @Inject(MAT_DIALOG_DATA) public item: any, private userService: UserService, private authService: AuthService, private postService: PostService) { }

  ngOnDestroy(): void {
    this.closeDialog();
  }

  ngOnInit(): void {
    console.log(this.item);
    this.userService.getUser(this.item.userId).subscribe(user => {
      this.user = user;
    })

    this.postService.getLikedPostByUserId(this.authService.getUserId()).subscribe(res => {
      this.likedPosts = res;
    })
  }

  like(event: any) {
    var x = event.target;
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

  closeDialog() {
    this.dialogRef.close({ event: this.item });
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
