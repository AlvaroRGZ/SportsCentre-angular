import {Component, OnInit} from '@angular/core';
import {NoticeComponent} from "../notice/notice.component";
import {Router, RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [
    NoticeComponent,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.css'
})
export class ClientsComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }
}
