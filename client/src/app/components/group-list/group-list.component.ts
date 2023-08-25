import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {

  groups:any = []

  constructor(private groupService: GroupService) {}

  groupData = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
    photo: new FormControl(''),
  })

  ngOnInit(): void {
    this.getGroups()
    console.log(this.groups)
  }

  getGroups() {
    const user = JSON.parse(localStorage.getItem('user')!)
    this.groupService.getUserGroups(user.result._id)
    .subscribe(
      res => {
        this.groups = res
      },
      err => console.log(err)
    )
  }

  createGroup() {

  }
}
