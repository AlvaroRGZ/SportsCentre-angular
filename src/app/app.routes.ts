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
import {AdminBookingsComponent} from "./administration/admin-bookings/admin-bookings.component";
import {ClientsComponent} from "./clients/clients.component";
import {ComplaintsComponent} from "./clients/complaints/complaints.component";
import {ClientOptionsComponent} from "./clients/client-options/client-options.component";
import {AdminComplaintsComponent} from "./administration/admin-complaints/admin-complaints.component";
import {HomeOptionsComponent} from "./home/home-options/home-options.component";
import {AdminNoticesComponent} from "./administration/admin-notices/admin-notices.component";
import {MyBookingsComponent} from "./clients/my-bookings/my-bookings.component";
import {AdminSportclassesComponent} from "./administration/admin-sportclasses/admin-sportclasses.component";
import {SportClassesComponent} from "./clients/sport-classes/sport-classes.component";
import {SportClassDetailsComponent} from "./clients/sport-classes/sport-class-details/sport-class-details.component";
import {MySportClassesComponent} from "./clients/my-sport-classes/my-sport-classes.component";
import {OnlyAdminsCanActivate} from "./authentication/guards/AdminGuard";
import {Routes} from "@angular/router";
import {UsersCantActivate} from "./authentication/guards/ClientsGuard";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'notices', component: NoticeComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'administration', component: AdministrationComponent, canActivateChild: [OnlyAdminsCanActivate],
    children: [
      {path: '', component: AdminOptionsComponent},
      {path: 'installations', component: AdminInstallationsComponent},
      {path: 'materials', component: AdminMaterialsComponent},
      {path: 'notices', component: AdminNoticesComponent},
      {path: 'complaints', component: AdminComplaintsComponent},
      {path: 'bookings', component: AdminBookingsComponent},
      {path: 'sport-classes', component: AdminSportclassesComponent}
    ]
  },
  { path: 'home', component: HomeComponent,
    children: [
      {path: '', component: HomeOptionsComponent},
      {path: 'installations', component: InstallationsComponent },
      {path: 'installations/:id', component: InstallationComponent },
      {path: 'sport-classes', component: SportClassesComponent},
      {path: 'sport-classes/:id', component: SportClassDetailsComponent},
    ]
  },
  { path: 'clients', component: ClientsComponent, canActivateChild: [UsersCantActivate],
    children: [
      {path: '', component: ClientOptionsComponent},
      {path: 'complaints', component: ComplaintsComponent},
      {path: 'installations', component: InstallationsComponent},
      {path: 'installations/:id', component: InstallationComponent},
      {path: 'my-bookings', component: MyBookingsComponent},
      {path: 'sport-classes', component: SportClassesComponent},
      {path: 'sport-classes/:id', component: SportClassDetailsComponent},
      {path: 'my-classes', component: MySportClassesComponent},
    ] }
];
