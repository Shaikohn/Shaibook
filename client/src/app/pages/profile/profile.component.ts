import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService: ProfileService, private commentService: CommentService, private postService: PostService) {}

  user:any = {}
  post:any

  editing:boolean = false
  editingPost:boolean = false
  viewingComments:boolean = false
  comments:any = []

  profileData = new FormGroup({
    username: new FormControl(''),
    picture: new FormControl(''),
  })

  commentData = new FormGroup({
    text: new FormControl(''),
    username: new FormControl(''),
    userId: new FormControl(''),
    postId: new FormControl(''),
    userPicture: new FormControl(''),
  })

  editPostData = new FormGroup({
    text: new FormControl(''),
    _id: new FormControl(''),
    photos: new FormControl(''),
  })

  ngOnInit(): void {
    this.getProfile()
  }

  getProfile() {
    const user = JSON.parse(localStorage.getItem('user')!)
    this.profileService.getProfile(user.result._id)
    .subscribe(
      res => {
        this.user = res
      },
      err => console.log(err)
    )
  }

  setEditing() {
    this.editing = !this.editing
  }

  setViewingComments(p:Array<object>) {
    this.viewingComments = !this.viewingComments
    this.comments = []
    this.comments = p
  }

  setEditingPost(p:object) {
    this.editingPost = !this.editingPost
    this.post = p
    this.editPostData.value.text = this.post.text
    this.editPostData.value.photos = this.post.photos
  }

  editPost() {
    if(this.editPostData.value.text === "") {
      this.editPostData.value.text = this.post.text
    }
    if(this.editPostData.value.photos === "") {
      this.editPostData.value.photos = this.post.photos[0]
    }
    console.log(this.editPostData.value)
    this.postService.editPost(this.post._id, this.editPostData.value)
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

  deletePost(userId: string, _id: string) {
    this.postService.deletePost(userId, _id).subscribe(
      res => {
        console.log('Deleted!')
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
  }

  editProfile() {
    if(this.profileData.value.username === "") {
      this.profileData.value.username = this.user.username
    }
    if(this.profileData.value.picture === "") {
      this.profileData.value.picture = this.user.picture
    }
    this.profileService.editProfile(this.user._id, this.profileData.value)
    .subscribe(
      res => {
        localStorage.setItem('user', JSON.stringify(res))
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
    this.profileService.editPrivacity(this.user._id)
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

  acceptFollowRequest(userId: string) {
    const _id = this.user._id
    this.profileService.acceptFollowRequest(_id, userId)
    .subscribe(
      res => {
        this.getProfile()
      },
      err => console.log(err)
    )
  }

  addComment(postId: string) {
    this.commentData.value.userId = this.user.result._id
    this.commentData.value.username = this.user.result.username
    this.commentData.value.postId = postId
    this.commentData.value.userPicture = this.user.result.picture
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
    let userId = this.user.result._id
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
    let _id = this.user.result._id
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
    let _id = this.user.result._id
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
    let _id = this.user.result._id
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
    let _id = this.user._id
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
