import {Component, OnInit} from '@angular/core';
import {NoticeComponent} from "../notice/notice.component";
import {Router, RouterLink} from "@angular/router";
import {FirebaseAuthService} from "../authentication/firebase-auth.service";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NoticeComponent, NgIf, NgOptimizedImage],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isLoggedIn = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    //this.authService.getCurrentUser().subscribe(user => {
      this.isLoggedIn = false;
      console.log("Hago home");
    //});
  }

  login(): void {
    // Implement login logic
  }

  logout(): void {
    // this.authService.logout();
    console.log("Me voy a notice");
    this.router.navigate(['notices'])
  }
}
