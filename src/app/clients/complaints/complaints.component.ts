import {Component, OnInit} from '@angular/core';
import {Material} from "../../materials/material.model";
import {MaterialsService} from "../../materials/materials.service";
import {MatDialog} from "@angular/material/dialog";
import {
  CreateMaterialDialogComponent
} from "../../administration/admin-materials/create-material-dialog/create-material-dialog.component";
import {Complaint} from "./complaint.model";
import {ComplaintsService} from "./service/complaints.service";
import {CreateComplaintDialogComponent} from "./create-complaint-dialog/create-complaint-dialog.component";
import {MatIcon} from "@angular/material/icon";
import {MatButton, MatIconButton} from "@angular/material/button";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    NgForOf,
    MatButton,
    DatePipe
  ],
  templateUrl: './complaints.component.html',
  styleUrl: './complaints.component.css'
})
export class ComplaintsComponent implements OnInit {
  complaints: Complaint[] = [];

  constructor(
    private complaintService: ComplaintsService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadComplaints();
  }

  loadComplaints(): void {
    this.complaintService.getComplaints().subscribe(complaints => {
      this.complaints = complaints;
    });
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateComplaintDialogComponent, {
      width: '400px',
      data: { isUpdate: false, title: 'Create Complaint' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.createComplaint(result);
      }
    });
  }

  createComplaint(complaint: Complaint): void {
    this.complaintService.createComplaint(complaint).subscribe(() => {
      this.loadComplaints();
    });
  }

  deleteComplaint(id: string): void {
    this.complaintService.deleteComplaint(id).subscribe(() => {
      this.loadComplaints();
    });
  }
}
