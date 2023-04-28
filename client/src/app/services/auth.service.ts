import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private userUrl = 'http://localhost:3001/user'

  signIn(userData: object) {
    return this.http.post<User[]>(this.userUrl + '/signin', userData)/* .pipe(
      map((res: any) => res.data)
    ) */
  }

  signUp(userData: object) {
    return this.http.post<User[]>(this.userUrl + '/signup', userData)/* .pipe(
      map((res: any) => res.data)
    ) */
  }

  signGoogle(googleUser: object) {
    return this.http.post<User[]>(this.userUrl + '/googleUser', googleUser)/* .pipe(
      map((res: any) => res.data)
    ) */
  }

  loggedIn() {
    return !!localStorage.getItem('user')
  }
}
