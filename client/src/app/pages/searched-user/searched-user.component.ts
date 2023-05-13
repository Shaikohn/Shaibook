import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';

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

  constructor(private profileService: ProfileService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.getProfile()
  }

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
  }
}
