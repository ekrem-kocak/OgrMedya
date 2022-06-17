import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private url: string = "https://api.sosyaluniversiteli.tk/api/post"

  constructor(private http: HttpClient) { }

  createPost(post: Post) {
    return this.http.post(this.url + "/createPost", post);
  }

  getAllPosts() {
    return this.http.get(this.url);
  }

  getUserPost(id: number) {
    return this.http.get(this.url + "/" + id);
  }

  likePost(postId: number, userId: number) {
    return this.http.post(this.url + '/like?postId=' + postId + '&userId=' + userId, {});
  }

  dislikePost(postId: number, userId: number) {
    return this.http.post(this.url + '/dislike?postId=' + postId + '&userId=' + userId, {});
  }

  getLikedPostByUserId(userId: number) {
    return this.http.get(this.url + '/getLikedPostByUserId/' + userId);
  }

  deletePost(postId: number) {
    return this.http.delete(this.url + '/' + postId);
  }

}
