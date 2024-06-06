import { Component, OnInit } from '@angular/core';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {FirebaseAuthService} from "./authentication/firebase-auth.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'SportCentre-angular';
  constructor(private authService: FirebaseAuthService,
              private router: Router) {
  }
  ngOnInit () {
    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        switch (user.displayName) {
          case 'Administrador':
            this.router.navigate(['/notices']);
            break;
          case 'Profesor':
            this.router.navigate(['/login']);
            break;
          case 'Cliente':
            this.router.navigate(['/signup']);
            break;
          default:
            this.router.navigate(['/']);
            break;
        }
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
}
