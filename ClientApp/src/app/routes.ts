import { Routes } from "@angular/router";
import { ForgotPasswordComponent } from "./forgot-password/forgot-password.component";
import { FriendListComponent } from "./friend-list/friend-list.component";
import { AuthGuard } from "./guards/auth.guard";
import { EmailConfirmGuard } from "./guards/email-confirm.guard";
import { HomeComponent } from "./home/home.component";
import { MemberDetailComponent } from "./members/member-detail/member-detail.component";
import { MemberDetailsComponent } from "./members/member-details/member-details.component";
import { MemberListComponent } from "./members/member-list/member-list.component";

import { MessagesComponent } from "./messages/messages.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { RedirectComponent } from "./redirect/redirect.component";
import { ConfirmEmailComponent } from "./register/confirm-email/confirm-email.component";
import { LastOneStepComponent } from "./register/last-one-step/last-one-step.component";
import { RegisterStepsComponent } from "./register/register-steps/register-steps.component";
import { ResetPasswordComponent } from "./reset-password/reset-password.component";

export const appRoutes: Routes = [
  { path: "", component: HomeComponent, canActivate: [EmailConfirmGuard] },
  { path: "home", component: HomeComponent, canActivate: [EmailConfirmGuard] },
  { path: "members", component: MemberListComponent, canActivate: [AuthGuard, EmailConfirmGuard] },
  { path: "members/:id", component: MemberDetailsComponent, canActivate: [AuthGuard, EmailConfirmGuard] },
  { path: "member-detail", component: MemberDetailComponent, canActivate: [AuthGuard, EmailConfirmGuard] },
  { path: "friends", component: FriendListComponent, canActivate: [AuthGuard, EmailConfirmGuard] },
  { path: "messages", component: MessagesComponent, canActivate: [AuthGuard, EmailConfirmGuard] },
  { path: "confirm", component: ConfirmEmailComponent },
  { path: "steps", component: RegisterStepsComponent, canActivate: [AuthGuard] },
  { path: "reset-password", component: ResetPasswordComponent },
  { path: "forgot-password", component: ForgotPasswordComponent },
  { path: "last-one-step", component: LastOneStepComponent },
  { path: "redirect", component: RedirectComponent },
  { path: "**", component: NotFoundComponent }
]
