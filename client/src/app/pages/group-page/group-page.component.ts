import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';
import { PostService } from 'src/app/services/post.service';
import { CommentService } from 'src/app/services/comment.service';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {

  constructor(private groupService: GroupService, private postService: PostService, private commentService: CommentService, private route: ActivatedRoute) {}

  localUser:any = {}
  pendingFollowRequest:boolean = false
  follower:boolean = false
  viewingComments:boolean = false
  comments:any = []

  groupID:any = ""
  group:any = {}

  ngOnInit(): void {
    this.getFollowState()
  }

  postData = new FormGroup({
    text: new FormControl(''),
    username: new FormControl(''),
    userID: new FormControl(''),
    groupID: new FormControl(''),
    photos: new FormControl(''),
  })

  groupData = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    photo: new FormControl(''),
  })

  commentData = new FormGroup({
    text: new FormControl(''),
    username: new FormControl(''),
    userId: new FormControl(''),
    postId: new FormControl(''),
    userPicture: new FormControl(''),
  })

  getGroup() {
    this.route.params.subscribe(params => {
      this.groupID = params });
    this.groupService.getGroup(this.groupID)
    .subscribe(
      res => {
        this.group = res
      },
      err => console.log(err)
    )
  }

  getFollowState() {
    this.localUser = JSON.parse(localStorage.getItem('user')!)
    const _id = this.localUser.result._id
    const pendingFollowRequest = this.group?.followRequests?.find((f:any) => f?._id === _id)
    if(pendingFollowRequest !== undefined) {
      this.pendingFollowRequest = true
    }
    const followers = this.group.followers.find((f:any) => f === _id)
    if(followers !== undefined) {
      this.follower = true
    }
  }

  addGroupPost() {
    const user = JSON.parse(localStorage.getItem('user')!)
    this.postData.value.userID = user.result._id
    this.postData.value.groupID = this.groupID
    this.postData.value.username = user.result.username
    this.groupService.addPost(this.postData.value)
    .subscribe(
      res => {
        console.log('res', res)
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
  }

  editGroup() {
      this.groupData.value.name = this.group.name
      this.groupData.value.photo = this.group.photo
      this.groupService.editGroup(this.groupID, this.groupData.value)
    .subscribe(
      res => {
        this.group = res
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
  }

  editPrivacity() {
    this.groupService.editPrivacity(this.groupID)
    .subscribe(
      res => {
        this.getGroup()
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
  }

  followGroup() {
    const _id = this.localUser.result._id
    this.groupService.followGroup(_id, this.groupID)
    .subscribe(
      res => {
        this.getGroup()
      },
      err => console.log(err)
    )
  }

  unfollowGroup() {
    const _id = this.localUser.result._id
    this.groupService.unfollowGroup(_id, this.groupID)
    .subscribe(
      res => {
        this.getGroup()
      },
      err => console.log(err)
    )
  }

  deleteGroupPost(userID:string, postID:string) {
    this.groupService.deleteGroupPost(this.groupID, userID, postID)
    .subscribe(
      res => {
        console.log('res', res)
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
  }

  deleteGroup() {
    this.groupService.deleteGroup(this.groupID)
    .subscribe(
      res => {
        console.log('res', res)
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
  }
  addLike(postId: string) {
    let _id = this.localUser.result._id
    this.postService.addLike(_id, postId)
    .subscribe(
      res => {
        this.getGroup()
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
  }

  addDislike(postId: string) {
    let _id = this.localUser.result._id
    this.postService.addDislike(_id, postId)
    .subscribe(
      res => {
        this.getGroup()
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
  }

  deleteLike(postId: string) {
    let _id = this.localUser.result._id
    this.postService.deleteLike(_id, postId)
    .subscribe(
      res => {
        this.getGroup()
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
  }

  deleteDislike(postId: string) {
    let _id = this.localUser.result._id
    this.postService.deleteDislike(_id, postId)
    .subscribe(
      res => {
        this.getGroup()
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
  }

  setViewingComments(p:Array<object>) {
    this.viewingComments = !this.viewingComments
    this.comments = []
    this.comments = p
  }

  addComment(postId: string) {
    this.commentData.value.userId = this.localUser.result._id
    this.commentData.value.username = this.localUser.result.username
    this.commentData.value.postId = postId
    this.commentData.value.userPicture = this.localUser.result.picture
    this.commentService.addComment(this.commentData.value)
    .subscribe(
      res => {
        console.log('res', res)
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
  }

  deleteComment(_id: string, postId: string) {
    let userId = this.localUser.result._id
    this.commentService.deleteComment(userId, _id, postId)
    .subscribe(
      res => {
        console.log('res', res)
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
  }

  addCommentLike(commentId: string) {
    let _id = this.localUser.result._id
    this.commentService.addLike(_id, commentId)
    .subscribe(
      res => {
        this.getGroup()
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
  }

  addCommentDislike(commentId: string) {
    let _id = this.localUser.result._id
    this.commentService.addDislike(_id, commentId)
    .subscribe(
      res => {
        this.getGroup()
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
  }

  deleteCommentLike(commentId: string) {
    let _id = this.localUser.result._id
    this.commentService.deleteLike(_id, commentId)
    .subscribe(
      res => {
        this.getGroup()
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
  }

  deleteCommentDislike(commentId: string) {
    let _id = this.localUser.result._id
    this.commentService.deleteDislike(_id, commentId)
    .subscribe(
      res => {
        this.getGroup()
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
  }
}
