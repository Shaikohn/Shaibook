import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  private postUrl = 'http://localhost:3001/post'

  getPosts() {
    return this.http.get<Post[]>(this.postUrl + '/seePosts')
  }

  addPost(postData: object) {
    return this.http.post<Post[]>(this.postUrl + '/add', postData)
  }

  editPost(_id: string, postData: object) {
    return this.http.patch<Post[]>(this.postUrl + `/edit/${_id}`, postData)/* .pipe(
      map((res: any) => res.data)
    ) */
  }

  deletePost(userId: string, _id: string) {
    return this.http.delete<Post[]>(this.postUrl + `/delete/${userId}/${_id}`)/* .pipe(
      map((res: any) => res.data)
    ) */
  }
}
