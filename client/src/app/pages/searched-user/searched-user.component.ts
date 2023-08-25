import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-searched-user',
  templateUrl: './searched-user.component.html',
  styleUrls: ['./searched-user.component.css']
})
export class SearchedUserComponent implements OnInit {

  _id:any = ""
  user:any = {}
  localUser:any = {}
  pendingFollowRequest:boolean = false
  follower:boolean = false

  viewingComments:boolean = false
  comments:any = []

  constructor(private profileService: ProfileService, private route: ActivatedRoute, private commentService: CommentService, private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.getProfile()
  }

  commentData = new FormGroup({
    text: new FormControl(''),
    username: new FormControl(''),
    userId: new FormControl(''),
    postId: new FormControl(''),
    userPicture: new FormControl(''),
  })

  getProfile() {
    this.route.params.subscribe(params => {
      this._id = params });
    this.profileService.getProfile(this._id._id)
    .subscribe(
      res => {
        this.user = res
        this.getFollowState()
      },
      err => console.log(err)
    )
  }

  followUser() {
    this.localUser = JSON.parse(localStorage.getItem('user')!)
    const _id = this.localUser.result._id
    const userId = this.user._id
    this.profileService.followUser(_id, userId)
    .subscribe(
      res => {
        this.getProfile()
      },
      err => console.log(err)
    )
  }

  unfollowUser() {
    this.localUser = JSON.parse(localStorage.getItem('user')!)
    const _id = this.localUser.result._id
    const userId = this.user._id
    this.profileService.unfollowUser(_id, userId)
    .subscribe(
      res => {
        this.getProfile()
      },
      err => console.log(err)
    )
  }

  getFollowState() {
    this.localUser = JSON.parse(localStorage.getItem('user')!)
    const _id = this.localUser.result._id
    const pendingFollowRequest = this.user?.followRequests?.find((f:any) => f?._id === _id)
    if(pendingFollowRequest !== undefined) {
      this.pendingFollowRequest = true
    }
    const followers = this.user.followers.find((f:any) => f === _id)
    if(followers!== undefined) {
      this.follower = true
    }
    if(this.localUser.result._id === this.user._id) {
      this.router.navigate(['/profile'])
    }
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

  setViewingComments(p:Array<object>) {
    this.viewingComments = !this.viewingComments
    this.comments = []
    this.comments = p
  }

  addLike(postId: string) {
    this.localUser = JSON.parse(localStorage.getItem('user')!)
    let _id = this.localUser.result._id
    this.postService.addLike(_id, postId)
    .subscribe(
      res => {
        this.getProfile()
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
    this.localUser = JSON.parse(localStorage.getItem('user')!)
    let _id = this.localUser.result._id
    this.postService.addDislike(_id, postId)
    .subscribe(
      res => {
        this.getProfile()
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
    this.localUser = JSON.parse(localStorage.getItem('user')!)
    let _id = this.localUser.result._id
    this.postService.deleteLike(_id, postId)
    .subscribe(
      res => {
        this.getProfile()
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
    this.localUser = JSON.parse(localStorage.getItem('user')!)
    let _id = this.localUser.result._id
    this.postService.deleteDislike(_id, postId)
    .subscribe(
      res => {
        this.getProfile()
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
        this.getProfile()
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
        this.getProfile()
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
        this.getProfile()
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
        this.getProfile()
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
