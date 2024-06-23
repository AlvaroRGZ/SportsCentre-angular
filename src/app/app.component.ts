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
  userName: string = '';

  constructor(private authService: FirebaseAuthService, private router: Router) {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.userName = user?.email!;
        this.isLoggedIn = true;
      }
    });
  }

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout().then(() => {
      this.isLoggedIn = false;
      this.userName = '';
      this.router.navigate(['/home']);
    });
  }

  navigateHome(): void {
    this.authService.navigateHomeGivenUserRole();
  }
}
