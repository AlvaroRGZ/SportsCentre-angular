import {Component, OnInit} from '@angular/core';
import {NoticeComponent} from "../notice/notice.component";
import {RouterLink, RouterOutlet} from "@angular/router";

@Component({
  selector: 'app-administration',
  standalone: true,
  imports: [
    NoticeComponent,
    RouterLink,
    RouterOutlet
  ],
  templateUrl: './administration.component.html',
  styleUrl: './administration.component.css'
})
export class AdministrationComponent implements OnInit {
  ngOnInit(): void {
  }
}
