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
  constructor(private authService: FirebaseAuthService,
              private router: Router) {
  }
  ngOnInit () {

  }

  login() {

  }

  logout() {

  }
}
