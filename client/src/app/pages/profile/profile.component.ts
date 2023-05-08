import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profileService: ProfileService) {}

  user:any = {}

  editing:boolean = false

  profileData = new FormGroup({
    username: new FormControl(''),
    picture: new FormControl(''),
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
}
