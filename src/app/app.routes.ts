import { Routes } from '@angular/router';
import {NoticeComponent} from "./notice/notice.component";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";

export const routes: Routes = [
  { path: 'notices', component: NoticeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
];
