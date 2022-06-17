import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Post } from 'src/app/models/post';
import { PostService } from 'src/app/services/post.service';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  profileImgUrl: string;
  photoPath: string;
  photos: string[] = [];

  myform: FormGroup = new FormGroup({
    area: new FormControl()
  })

  constructor(private authService: AuthService, private userService: UserService, private http: HttpClient, private postService: PostService) { }

  ngOnInit(): void {
    this.userService.getUser(this.authService.getUserId()).subscribe(user => {
      this.profileImgUrl = user.profileImageUrl;
    })
  }

  uploadFile = (files: any) => {
    console.log("girdi");
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://api.sosyaluniversiteli.tk/api/upload/uploadPhotoForPost', formData, { reportProgress: true, observe: 'events' })
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.Response) {
            this.photos.push(this.uploadFinished(event.body));
            console.log(this.uploadFinished(event.body));
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
  }

  uploadFinished(event: any) {
    return this.createImgPath(event.dbPath)
  }

  createImgPath(serverPath: string) {
    var path: string = serverPath;
    var arr = path.split('\\');
    return `https://api.sosyaluniversiteli.tk/resources/posts/${arr[2]}`;
  }

  removePhoto(p: string) {
    this.photos.splice(this.photos.findIndex(i => i == p), 1)
  }

  postCreate() {
    var images: ImageForPost[] = [];

    this.photos.forEach(i => {
      images.push({ url: i })
    });

    var post: Post = {
      context: this.myform.get('area').value,
      images: images
    }
    console.log(post);
    this.postService.createPost(post).subscribe(res => {
      console.log(res);
      window.location.reload();
    })
  }
}

class ImageForPost {
  url: string;
}
