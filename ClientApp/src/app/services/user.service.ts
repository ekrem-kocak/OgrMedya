import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UserForUpdate } from '../models/user-for-update';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private url: string = "https://api.sosyaluniversiteli.tk/api/users/"

  constructor(private http: HttpClient) { }

  getUsers(followParams?: any): Observable<User[]> {
    let params = new HttpParams();

    if (followParams == "followers")
      params = params.append("followers", true);

    if (followParams == "followings")
      params = params.append("followings", true);

    return this.http.get<User[]>(this.url, { params: params });
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.url + id);
  }

  updateUser(userid: string, model: UserForUpdate) {
    return this.http.put(this.url + userid, model);
  }

  followUser(followerId: number, userId: number) {
    return this.http.post(this.url + followerId + '/follow/' + userId, {});
  }

  unfollowUser(followerId: number, userId: number) {
    return this.http.post(this.url + followerId + '/unfollow/' + userId, {});
  }
}
