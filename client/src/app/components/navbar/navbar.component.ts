import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ProfileService } from 'src/app/services/profile.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  openProfile: boolean = false
  user:any = {}

  search = new FormGroup({
    text: new FormControl(''),
  })

  constructor(private router: Router, private profileService: ProfileService) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!)
  }
  setOpenProfile() {
    this.openProfile = !this.openProfile
  }

  goToMyProfile() {
    this.router.navigate(['/profile'])
  }

  signOut(){
    localStorage.removeItem('user')
    this.router.navigate(['/'])
  }
  goToSearch() {
    this.router.navigate(['search'],{ queryParams: { search: this.search.value.text } })
  }
}
