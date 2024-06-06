import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FirebaseAuthService} from "./authentication/firebase-auth.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'SportCentre-angular';
  isLoggedIn: Boolean = false;
  isAdmin: boolean = false;
  userRole: string = 'user';
  constructor(private authService: FirebaseAuthService,
              private router: Router) {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        switch (user.displayName) {
          case 'Administrador':
            this.isAdmin = true;
            break;
          case 'Profesor':
            this.isAdmin = true;
            break;
          case 'Cliente':
            //this.router.navigate(['/signup']);
            break;
          default:
            //this.router.navigate(['/home']);
            break;
        }
      } else {
        //this.router.navigate(['/notices']);
        this.userRole = 'user';
      }
    });
  }
  ngOnInit () {

  }

  login() {

  }

  logout() {

  }
}
