import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../interfaces/post.interface';
@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  private postUrl = 'http://localhost:3001/post'

  getPosts(_id:string) {
    return this.http.get<Post[]>(this.postUrl + `/seePosts/${_id}`)
  }

  addPost(postData: object) {
    return this.http.post<Post[]>(this.postUrl + '/add', postData)
  }

  editPost(_id: string, postData: object) {
    return this.http.patch<Post[]>(this.postUrl + `/edit/${_id}`, postData)
  }

  addLike(_id: string, postId: string) {
    return this.http.patch<Post[]>(this.postUrl + `/like/${_id}/${postId}`, null)
  }

  addDislike(_id: string, postId: string) {
    return this.http.patch<Post[]>(this.postUrl + `/dislike/${_id}/${postId}`, null)
  }

  deleteLike(_id: string, postId: string) {
    return this.http.delete<Post[]>(this.postUrl + `/deleteLike/${_id}/${postId}`)
  }

  deleteDislike(_id: string, postId: string) {
    return this.http.delete<Post[]>(this.postUrl + `/deleteDislike/${_id}/${postId}`)
  }

  deletePost(userId: string, _id: string) {
    return this.http.delete<Post[]>(this.postUrl + `/delete/${userId}/${_id}`)
  }
}
