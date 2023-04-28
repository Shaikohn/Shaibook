import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  openProfile: boolean = false

  constructor(private router: Router) {}

  ngOnInit(): void {

  }
  setOpenProfile() {
    this.openProfile = !this.openProfile
  }

  signOut(){
    localStorage.removeItem('user')
    this.router.navigate(['/'])
  }
}
