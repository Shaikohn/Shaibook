import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {
  login: boolean = false

  googleUser:any
  googleLoggedIn:any

  constructor(private authService: AuthService, private router: Router, private googleService: SocialAuthService) {}

  userData = new FormGroup({
    username: new FormControl(''/* , [Validators.minLength(4)] */),
    firstname: new FormControl(''/* , [Validators.minLength(4)] */),
    lastname: new FormControl(''/* , [Validators.minLength(4)] */),
    email: new FormControl('', /* [Validators.email] */),
    password: new FormControl(''/* , [Validators.minLength(4)] */),
    confirmPassword: new FormControl(''/* , [Validators.minLength(4)] */),
    picture: new FormControl(''/* , [Validators.minLength(4)] */),
  })

  setLogin() {
    this.login = !this.login
  }

  signUp() {
    if(this.userData.status === "VALID") {
      this.userData.value.picture = "../../../assets/userIcon.png"
      this.authService.signUp(this.userData.value)
    .subscribe(
      res => {
        localStorage.setItem('user', JSON.stringify(res))
        this.router.navigate(['/home'])
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
    } else {
      console.log('Errors', this.userData.errors)
    }
  }

  signIn() {
    if(this.userData.status === "VALID") {
      this.authService.signIn(this.userData.value)
    .subscribe(
      res => {
        localStorage.setItem('user', JSON.stringify(res))
        this.router.navigate(['/home'])
      },
      err => Swal.fire({
        title: "Error",
        text: err.error.message,
        icon: "error",
        timer: 2000,
    })
    )
    } else {
      console.log('Errors', this.userData.errors)
    }
  }

  ngOnInit() {
    this.googleService.authState.subscribe((user) => {
      this.googleUser = user
      this.googleLoggedIn = (user != null)
      this.authService.signGoogle(this.googleUser).subscribe(
        res => {
          console.log(res)
          localStorage.setItem('user', JSON.stringify(res))
          this.router.navigate(['/home'])
        },
        err => Swal.fire({
          title: "Error",
          text: err.error.message,
          icon: "error",
          timer: 2000,
      })
      )
    })
  }
}
