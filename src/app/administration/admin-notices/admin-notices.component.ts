import {Component, OnInit} from '@angular/core';
import {MatButton, MatIconButton} from "@angular/material/button";
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {Notice} from "../../notice/notice.model";
import {NoticeService} from "../../notice/notice.service";
import {MatDialog} from "@angular/material/dialog";
import {CreateNoticeDialogComponent} from "./create-notice-dialog/create-notice-dialog.component";

@Component({
  selector: 'app-admin-notices',
  standalone: true,
  imports: [
    MatButton,
    MatTable,
    MatColumnDef,
    MatHeaderCell,
    MatCell,
    MatIconButton,
    MatIcon,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatCellDef,
    MatHeaderRowDef,
    MatRowDef
  ],
  templateUrl: './admin-notices.component.html',
  styleUrl: './admin-notices.component.css'
})
export class AdminNoticesComponent implements OnInit {
  notices: Notice[] = [];
  displayedColumns: string[] = ['title', 'body', 'actions'];

  constructor(
    private noticeService: NoticeService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadNotices();
  }

  loadNotices(): void {
    this.noticeService.getNotices().subscribe((notices: Notice[]) => {
      this.notices = notices;
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateNoticeDialogComponent, {
      width: '400px',
      data: { notice: { id: '', title: '', body: '', dateTime: new Date() }, isUpdate: false, title: 'Create New Notice' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createNotice(result);
      }
    });
  }

  createNotice(notice: Notice): void {
    this.noticeService.createNotice(notice).subscribe(() => {
      this.loadNotices();
    });
  }

  openUpdateDialog(notice: Notice): void {
    const dialogRef = this.dialog.open(CreateNoticeDialogComponent, {
      width: '400px',
      data: { notice: notice, isUpdate: true, title: 'Update Notice' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.updateNotice(result);
      }
    });
  }

  updateNotice(notice: Notice): void {
    this.noticeService.updateNotice(notice).subscribe(() => {
      this.loadNotices();
    });
  }

  deleteNotice(id: string): void {
    this.noticeService.deleteNotice(id).subscribe(() => {
      this.loadNotices();
    });
  }
}
