import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { JwtModule } from "@auth0/angular-jwt";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { FriendListComponent } from './friend-list/friend-list.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { ErrorInterceptor } from './services/error.interceptor';
import { MemberDetailsComponent } from './members/member-details/member-details.component';
import { PhotoGalleryComponent } from './members/member-details/photo-gallery/photo-gallery.component';
import { ConfirmEmailComponent } from './register/confirm-email/confirm-email.component';
import { LastOneStepComponent } from './register/last-one-step/last-one-step.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RegisterStepsComponent } from './register/register-steps/register-steps.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MaterialModule } from './material-module';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { UploadComponent } from './upload/upload.component';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';

import { TimeagoCustomFormatter, TimeagoFormatter, TimeagoIntl, TimeagoModule } from 'ngx-timeago';
import { NgxLoadingModule } from 'ngx-loading';
import { CreatePostComponent } from './posts/create-post/create-post.component';
import { PostComponent } from './posts/post/post.component';
import { PostsComponent } from './posts/posts.component';
import { RedirectComponent } from './redirect/redirect.component';
import { NgbModule, NgbCarousel, NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { PostDetailComponent } from './posts/post/post-detail/post-detail.component';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    MemberListComponent,
    FriendListComponent,
    HomeComponent,
    MessagesComponent,
    NotFoundComponent,
    MemberDetailsComponent,
    PhotoGalleryComponent,
    ConfirmEmailComponent,
    LastOneStepComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    RegisterStepsComponent,
    UploadComponent,
    MemberEditComponent,
    MemberDetailComponent,
    CreatePostComponent,
    PostComponent,
    PostsComponent,
    RedirectComponent,
    PostDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,

    MaterialModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["api.sosyaluniversiteli.tk"],
        disallowedRoutes: ["api.sosyaluniversiteli.t/api/auth"],
      },
    }),

    TimeagoModule.forRoot({ formatter: { provide: TimeagoFormatter, useClass: TimeagoCustomFormatter }, }),

    NgxLoadingModule.forRoot({}),

    BrowserAnimationsModule,
    NgbModule,
    NgbCarouselModule
  ],
  providers: [
    AuthGuard, {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
    { provide: MAT_DATE_LOCALE, useValue: 'tr-TR' },
    TimeagoIntl
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
