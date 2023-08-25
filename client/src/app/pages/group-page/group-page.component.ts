import { Component } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent {

  constructor(private groupService: GroupService, private route: ActivatedRoute) {}

  groupID:any = ""
  group:any = {}

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
}
