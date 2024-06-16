import {Component, OnInit} from '@angular/core';
import {Router, RouterLink} from "@angular/router";
import {NoticeComponent} from "../../notice/notice.component";

@Component({
  selector: 'app-client-options',
  standalone: true,
  imports: [
    NoticeComponent,
    RouterLink
  ],
  templateUrl: './client-options.component.html',
  styleUrl: './client-options.component.css'
})
export class ClientOptionsComponent implements OnInit {
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

