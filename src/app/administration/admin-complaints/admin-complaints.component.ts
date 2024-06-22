import { Component, OnInit } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { DatePipe, NgForOf } from "@angular/common";
import { forkJoin } from "rxjs";

import { User } from "../../User/user.model";
import { Complaint } from "../../clients/complaints/complaint.model";
import { UserService } from "../../User/user.service";
import { ComplaintsService } from "../../clients/complaints/service/complaints.service";

@Component({
  selector: 'app-admin-complaints',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    NgForOf,
    DatePipe
  ],
  templateUrl: './admin-complaints.component.html',
  styleUrls: ['./admin-complaints.component.css']
})
export class AdminComplaintsComponent implements OnInit {
  users: User[] = [];
  complaintsByUser: { [key: string]: Complaint[] } = {};

  constructor(
    private userService: UserService,
    private complaintsService: ComplaintsService
  ) {}

  ngOnInit(): void {
    this.loadUsersAndComplaints();
  }

  loadUsersAndComplaints(): void {
    this.userService.getUsersWhoHaveComplaints().subscribe(users => {
      this.users = users;
      const complaintsRequests = users.map(user =>
        this.userService.getUserComplaints(user.email)
      );

      forkJoin(complaintsRequests).subscribe(complaintsArray => {
        complaintsArray.forEach((complaints, index) => {
          this.complaintsByUser[this.users[index].id] = complaints;
        });
        console.log(this.complaintsByUser);
      });
    });
  }

  deleteComplaint(userId: string, complaintId: string): void {
    this.userService.deleteComplaint(userId, complaintId).subscribe(() => {
      this.complaintsByUser[userId] = this.complaintsByUser[userId].filter(complaint => complaint.id !== complaintId);
    });
  }
}
