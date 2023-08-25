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
} from '@abacritt/angularx-social-login';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { PostComponent } from './components/post/post.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchResultsComponent } from './pages/search-results/search-results.component';
import { SearchedUserComponent } from './pages/searched-user/searched-user.component';
import { CommentSVGComponent } from './svg/comment-svg/comment-svg.component';
import { LikeSVGComponent } from './svg/like-svg/like-svg.component';
import { DislikeSVGComponent } from './svg/dislike-svg/dislike-svg.component';
import { DeleteDislikeSVGComponent } from './svg/delete-dislike-svg/delete-dislike-svg.component';
import { DeleteLikeSVGComponent } from './svg/delete-like-svg/delete-like-svg.component';
import { TrashSVGComponent } from './svg/trash-svg/trash-svg.component';
import { LikesSVGComponent } from './svg/likes-svg/likes-svg.component';
import { DislikesSVGComponent } from './svg/dislikes-svg/dislikes-svg.component';
import { EditSVGComponent } from './svg/edit-svg/edit-svg.component';
import { ChatComponent } from './pages/chat/chat.component';
import { GroupListComponent } from './components/group-list/group-list.component';
import { GroupPageComponent } from './pages/group-page/group-page.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    NavbarComponent,
    HomeComponent,
    PostComponent,
    ProfileComponent,
    SearchResultsComponent,
    SearchedUserComponent,
    CommentSVGComponent,
    LikeSVGComponent,
    DislikeSVGComponent,
    DeleteDislikeSVGComponent,
    DeleteLikeSVGComponent,
    TrashSVGComponent,
    LikesSVGComponent,
    DislikesSVGComponent,
    EditSVGComponent,
    ChatComponent,
    GroupListComponent,
    GroupPageComponent,
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
