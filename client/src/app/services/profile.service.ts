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
}
