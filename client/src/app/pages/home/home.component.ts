import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Post } from 'src/app/interfaces/post.interface';
import { PostService } from 'src/app/services/post.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(private postService: PostService) {}

  editing:boolean = false

  posts:Post[] = []
  post:any

  ngOnInit(): void {
    this.postService.getPosts()
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
  localUser = JSON.parse(localStorage.getItem('user')!)

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
}
