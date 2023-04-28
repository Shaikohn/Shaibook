import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http'
import { SocialLoginModule, SocialAuthServiceConfig, GoogleSigninButtonModule } from '@abacritt/angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider
} from '@abacritt/angularx-social-login';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    HomeComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, HttpClientModule, SocialLoginModule, GoogleSigninButtonModule],
  providers: [AuthGuard,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '207488495765-qja46562r4hn9ahokdarck6u8f1j1dht.apps.googleusercontent.com'
            )
          },
        ],
        onError: (err) => {
          console.error(err);
        }
      } as SocialAuthServiceConfig,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
