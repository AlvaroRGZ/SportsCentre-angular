import { Component } from '@angular/core';
import {Notice} from "./notice.model";
import {NoticeService} from "./notice.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-notice',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './notice.component.html',
  styleUrl: './notice.component.css'
})
export class NoticeComponent {
  notices: Notice[] = [];

  constructor(private noticeService: NoticeService) {
    this.noticeService.getNotices().subscribe((data: Notice[]) => {
      this.notices = data;
    });
  }
}
