import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Post } from 'src/app/interfaces/post.interface';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private postService: PostService, private commentService: CommentService, private profileService: ProfileService) {}

  editing:boolean = false
  viewingComments:boolean = false
  comments:any = []

  posts:Post[] = []
  post:any
  user:any = {}

  ngOnInit(): void {
    this.getProfile()
    this.user = JSON.parse(localStorage.getItem('user')!)
    this.postService.getPosts(this.user.result._id)
    .subscribe(
      res => {
        this.posts = [...this.posts, ...res]
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
  }

  editPostData = new FormGroup({
    text: new FormControl(''),
    _id: new FormControl(''),
    photos: new FormControl(''),
  })

  postData = new FormGroup({
    text: new FormControl(''),
    username: new FormControl(''),
    _id: new FormControl(''),
    photos: new FormControl(''),
  })

  commentData = new FormGroup({
    text: new FormControl(''),
    username: new FormControl(''),
    userId: new FormControl(''),
    postId: new FormControl(''),
    userPicture: new FormControl(''),
  })
  localUser = JSON.parse(localStorage.getItem('user')!)

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

  addPost() {
    this.postData.value._id = this.localUser.result._id
    this.postData.value.username = this.localUser.result.username
    this.postService.addPost(this.postData.value)
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

  setEditing(p:object) {
    this.editing = !this.editing
    this.post = p
    this.editPostData.value.text = this.post.text
    this.editPostData.value.photos = this.post.photos
    console.log(this.editPostData.value)
  }
  setViewingComments(p:Array<object>) {
    this.viewingComments = !this.viewingComments
    this.comments = []
    this.comments = p
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

  addLike(postId: string) {
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
