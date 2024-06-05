import {Component, OnInit} from '@angular/core';
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
export class NoticeComponent implements OnInit {
  notices: Notice[] = [];

  constructor(private noticeService: NoticeService) {}

  ngOnInit(): void {
    this.noticeService.getNotices().subscribe((data: Notice[]) => {
      console.log('Data fetched from API:', data);
      this.notices = data;
      console.log('Notices after assignment:', this.notices);
    });
  }
}
