import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {DatePipe, NgForOf, NgIf} from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { Complaint } from './complaint.model';
import { ComplaintsService } from './service/complaints.service';
import { CreateComplaintDialogComponent } from './create-complaint-dialog/create-complaint-dialog.component';
import { UserService } from '../../User/user.service';
import { FirebaseAuthService } from '../../authentication/firebase-auth.service';

@Component({
  selector: 'app-complaints',
  standalone: true,
  imports: [
    MatIcon,
    MatIconButton,
    NgForOf,
    MatButton,
    DatePipe,
    NgIf
  ],
  templateUrl: './complaints.component.html',
  styleUrl: './complaints.component.css'
})
export class ComplaintsComponent implements OnInit {
  complaints: Complaint[] = [];
  private userEmail: string | null = '';

  constructor(
    private complaintService: ComplaintsService,
    private userService: UserService,
    private authService: FirebaseAuthService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getCurrentUserAndFetchComplaints();
  }

  getCurrentUserAndFetchComplaints(): void {
    this.authService.getCurrentUser().subscribe(user => {
      if (user && user.email) {
        this.userEmail = user.email;
        this.fetchUserComplaints();
      } else {
        console.error('User not logged in or user email unavailable.');
        // Handle scenario where user is not logged in or email is unavailable
      }
    });
  }

  fetchUserComplaints(): void {
    if (this.userEmail) {
      this.userService.getUserComplaints(this.userEmail)
        .subscribe(
          (complaints: Complaint[]) => {
            console.log("RECIBI COMPLAINTS DE " + this.userEmail)
            console.log(this.complaints)
            this.complaints = complaints;
          },
          (error) => {
            console.error('Error fetching user complaints:', error);
            // Handle error as needed
          }
        );
    } else {
      console.error('User email is null.');
      // Handle scenario where userEmail is null
    }
  }

  openCreateDialog(): void {
    const dialogRef = this.dialog.open(CreateComplaintDialogComponent, {
      width: '400px',
      data: { isUpdate: false, title: 'Create Complaint' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addComplaint(result.title, result.body);
      }
    });
  }

  addComplaint(title: string, body: string): void {
    const newComplaint: Complaint = {
      id: '', // Server will generate the ID
      title,
      body,
      datetime: new Date()
    };

    if (this.userEmail) {
      this.userService.addComplaint(this.userEmail, newComplaint)
        .subscribe(
          (response) => {
            console.log('Complaint added successfully:', response);
            this.fetchUserComplaints();
          },
          (error) => {
            console.error('Error adding complaint:', error);
          }
        );
    } else {
      console.error('User email is null.');
    }
  }

  deleteComplaint(complaintId: string): void {
    if (this.userEmail) {
      this.userService.deleteComplaint(this.userEmail, complaintId)
        .subscribe(
          (response) => {
            console.log('Complaint deleted successfully:', response);
            this.fetchUserComplaints();
          },
          (error) => {
            console.error('Error deleting complaint:', error);
          }
        );
    } else {
      console.error('User email is null.');
    }
  }
}
