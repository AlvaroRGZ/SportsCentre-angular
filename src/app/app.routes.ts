import { Routes } from '@angular/router';
import {NoticeComponent} from "./notice/notice.component";
import {SignupComponent} from "./signup/signup.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {InstallationsComponent} from "./installations/installations.component";
import {InstallationComponent} from "./installations/installation/installation.component";
import {AdministrationComponent} from "./administration/administration.component";
import {AdminInstallationsComponent} from "./administration/admin-installations/admin-installations.component";
import {AdminOptionsComponent} from "./administration/admin-options/admin-options.component";
import {AdminMaterialsComponent} from "./administration/admin-materials/admin-materials.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'notices', component: NoticeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'installations', component: InstallationsComponent },
  { path: 'installations/:id', component: InstallationComponent },
  { path: 'administration', component: AdministrationComponent,
    children: [
      {path: '', component: AdminOptionsComponent},
      {path: 'installations', component: AdminInstallationsComponent},
      {path: 'materials', component: AdminMaterialsComponent}
    ]
  },
  { path: 'home', component: HomeComponent }
];
