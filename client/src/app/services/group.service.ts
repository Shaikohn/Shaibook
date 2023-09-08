import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Group } from '../interfaces/group.interface';
@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  private groupUrl = 'http://localhost:3001/group'

  createGroup(groupData: object) {
    return this.http.post<Group[]>(this.groupUrl + '/create', groupData)
  }

  getGroup(_id:string) {
    return this.http.get<Group[]>(this.groupUrl + `/getGroup/${_id}`)
  }

  getUserGroups(_id:string) {
    return this.http.get(this.groupUrl + `/getUserGroups/${_id}`)
  }

  addPost(postData: object) {
    return this.http.post<Group[]>(this.groupUrl + '/create', postData)
  }

  editGroup(_id: string, groupData: object) {
    return this.http.patch<Group[]>(this.groupUrl + `/edit/${_id}`, groupData)
  }

  editPrivacity(_id: string) {
    return this.http.patch<Group[]>(this.groupUrl + `/privacity/${_id}`, null)
  }

  deleteGroupPost(postId: string,userId: string, groupId: string) {
    return this.http.delete<Group[]>(this.groupUrl + `/delete/${groupId}/${userId}/${postId}`)
  }

  deleteGroup(_id: string) {
    return this.http.delete<Group[]>(this.groupUrl + `/delete/${_id}`)
  }

  followGroup(_id: string, groupId:string) {
    return this.http.patch<Group[]>(this.groupUrl + `/follow/${_id}/${groupId}`, null)
  }

  acceptFollowRequest(_id: string, groupId:string) {
    return this.http.patch<Group[]>(this.groupUrl + `/acceptRequest/${_id}/${groupId}`, null)
  }

  rejectFollowRequest(_id: string, groupId:string) {
    return this.http.patch<Group[]>(this.groupUrl + `/rejectRequest/${_id}/${groupId}`, null)
  }

  unfollowGroup(_id: string, groupId:string) {
    return this.http.patch<Group[]>(this.groupUrl + `/unfollow/${_id}/${groupId}`, null)
  }
}
