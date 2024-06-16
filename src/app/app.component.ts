import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FirebaseAuthService} from "./authentication/firebase-auth.service";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NgIf, MatIcon],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'SportCentre-angular';
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  userRole: string = 'user';

  constructor(private authService: FirebaseAuthService, private router: Router) {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        switch (user.displayName) {
          case 'admin':
            this.isAdmin = true;
            this.userRole = 'admin';
            break;
          case 'teacher':
            this.isAdmin = true;
            this.userRole = 'teacher';
            break;
          case 'client':
            this.userRole = 'client';
            break;
          default:
            this.userRole = 'user';
            break;
        }
        this.isLoggedIn = true;
      } else {
        this.userRole = 'user';
      }
    });
  }

  ngOnInit(): void {}

  login(): void {
    // Implement login logic
  }

  logout(): void {
    this.authService.logout().then(() => {
      this.isLoggedIn = false;
      this.router.navigate(['/home']);
    });
  }

  navigateHome(): void {
    if (this.isLoggedIn) {
      if (this.userRole === 'admin') {
        this.router.navigate(['/administration']);
      } else if (this.userRole === 'client') {
        this.router.navigate(['/clients']);
      }
    } else {
      this.router.navigate(['/home']);
    }
  }
}
