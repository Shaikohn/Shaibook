import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  private userUrl = 'http://localhost:3001/user'

  getProfile(_id:string) {
    return this.http.get<User[]>(this.userUrl + `/profile/${_id}`)
  }

  editProfile(_id: string, profileData: object) {
    return this.http.patch<User[]>(this.userUrl + `/edit/${_id}`, profileData)
  }

  editPrivacity(_id: string) {
    return this.http.patch<User[]>(this.userUrl + `/privacity/${_id}`, null)
  }

  searchProfiles(search:string) {
    return this.http.get<User[]>(this.userUrl + `/search/${search}`)
  }

  followUser(_id: string, userId:string) {
    return this.http.patch<User[]>(this.userUrl + `/follow/${_id}/${userId}`, null)
  }

  acceptFollowRequest(_id: string, userId:string) {
    return this.http.patch<User[]>(this.userUrl + `/acceptRequest/${_id}/${userId}`, null)
  }

  rejectFollowRequest(_id: string, userId:string) {
    return this.http.patch<User[]>(this.userUrl + `/rejectRequest/${_id}/${userId}`, null)
  }

  unfollowUser(_id: string, userId:string) {
    return this.http.patch<User[]>(this.userUrl + `/unfollow/${_id}/${userId}`, null)
  }

}
