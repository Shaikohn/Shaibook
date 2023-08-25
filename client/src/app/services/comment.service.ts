import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Comment } from '../interfaces/comment.interface';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient) { }

  private commentUrl = 'http://localhost:3001/comment'

  addComment(commentData: object) {
    return this.http.post<Comment[]>(this.commentUrl + '/add', commentData)
  }

  deleteComment(userId: string, _id: string, postId:string) {
    return this.http.delete<Comment[]>(this.commentUrl + `/${userId}/${_id}/${postId}`)
  }

  addLike(_id: string, commentId: string) {
    return this.http.patch<Comment[]>(this.commentUrl + `/like/${_id}/${commentId}`, null)
  }

  addDislike(_id: string, commentId: string) {
    return this.http.patch<Comment[]>(this.commentUrl + `/dislike/${_id}/${commentId}`, null)
  }

  deleteLike(_id: string, commentId: string) {
    return this.http.delete<Comment[]>(this.commentUrl + `/deleteLike/${_id}/${commentId}`)
  }

  deleteDislike(_id: string, commentId: string) {
    return this.http.delete<Comment[]>(this.commentUrl + `/deleteDislike/${_id}/${commentId}`)
  }
}
