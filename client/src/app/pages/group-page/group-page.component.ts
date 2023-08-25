import { Component } from '@angular/core';
import { GroupService } from 'src/app/services/group.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-group-page',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent {

  constructor(private groupService: GroupService, private route: ActivatedRoute) {}

  groupID:any = ""
  group:any = {}

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
}
