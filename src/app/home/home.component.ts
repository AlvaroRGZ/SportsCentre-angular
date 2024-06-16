import {Component, OnInit} from '@angular/core';
import {NoticeComponent} from "../notice/notice.component";
import {Router, RouterLink, RouterOutlet} from "@angular/router";
import {NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NoticeComponent, NgIf, NgOptimizedImage, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {
  }
}
