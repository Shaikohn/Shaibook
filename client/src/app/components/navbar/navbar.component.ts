import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  openProfile: boolean = false

  constructor() {}

  ngOnInit(): void {

  }
  setOpenProfile() {
    this.openProfile = !this.openProfile
  }
}
