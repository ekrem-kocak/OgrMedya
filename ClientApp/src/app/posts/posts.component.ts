import { Component, OnInit } from '@angular/core';
import { Post } from '../models/post';
import { PostService } from '../services/post.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {

  posts: any;
  viewedPosts: any;
  loading: boolean = false;

  constructor(private postService: PostService, private userService: UserService) { }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.loading = true;
    this.postService.getAllPosts().subscribe(posts => {
      this.posts = posts;
      this.viewedPosts = posts;
      console.log(this.posts);
      this.loading = false;
    })
  }

  search(event: any) {
    var filter: string = event.target.value.toLowerCase();
    console.log(filter);
    this.viewedPosts = this.posts.filter(
      (i: any) =>
        i.context?.toLowerCase().includes(filter) ||
        i.user?.name?.toLowerCase().includes(filter) ||
        i.user?.department?.toLowerCase().includes(filter) ||
        i.user?.universityName?.toLowerCase().includes(filter) ||
        i.user?.userName?.toLowerCase().includes(filter)
    );
  }

}
