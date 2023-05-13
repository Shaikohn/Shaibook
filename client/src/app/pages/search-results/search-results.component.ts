import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  params:any = ""
  users:any = []

  constructor(private profileService: ProfileService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => this.params = params);

    this.profileService.searchProfiles(this.params.params.search)
    .subscribe(
      res => {
        this.users = res
      },
      err => console.log(err)
    )
  }

  seeProfile(_id:string) { {
      this.router.navigate(['/user', _id]);
    }
  }

}
