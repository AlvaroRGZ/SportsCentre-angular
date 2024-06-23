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

  constructor(private router: Router) {}

  ngOnInit(): void {
  }
}

