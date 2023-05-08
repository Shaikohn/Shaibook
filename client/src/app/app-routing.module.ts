import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AuthFormGuard } from './guards/auth-form.guard';
import { ProfileComponent } from './pages/profile/profile.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent, canActivate: [AuthFormGuard]},
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard]},
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
