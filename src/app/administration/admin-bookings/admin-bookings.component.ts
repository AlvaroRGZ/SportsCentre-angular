import { Component, OnInit } from '@angular/core';
import { Installation } from "../../installations/installation.model";
import { InstallationService } from "../../installations/installation.service";
import { MatDialog } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { Booking } from "../../installations/installation/booking-creation/bookingServices/booking.model";
import { BookingsService } from "../../installations/installation/booking-creation/bookingServices/bookings.service";
import { forkJoin } from "rxjs";
import {DatePipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-admin-bookings',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    NgForOf,
    DatePipe
  ],
  templateUrl: './admin-bookings.component.html',
  styleUrls: ['./admin-bookings.component.css']
})
export class AdminBookingsComponent implements OnInit {
  installations: Installation[] = [];
  bookingsByInstallation: { [key: string]: Booking[] } = {};

  constructor(
    private installationService: InstallationService,
    private bookingService: BookingsService
  ) {}

  ngOnInit(): void {
    this.loadInstallationsAndBookings();
  }

  loadInstallationsAndBookings(): void {
    this.installationService.getInstallations().subscribe(installations => {
      this.installations = installations;
      const bookingRequests = installations.map(inst =>
        this.bookingService.getBookingsByInstallation(inst.id)
      );

      forkJoin(bookingRequests).subscribe(bookingsArray => {
        bookingsArray.forEach((bookings, index) => {
          this.bookingsByInstallation[this.installations[index].id] = bookings;
        });
        console.log(this.bookingsByInstallation);
      });
    });
  }

  editBooking(booking: Booking): void {
    // Implement edit functionality here
  }

  deleteBooking(id: string): void {
    this.bookingService.deleteBooking(id).subscribe(() => {
      for (const installationId in this.bookingsByInstallation) {
        this.bookingsByInstallation[installationId] = this.bookingsByInstallation[installationId].filter(booking => booking.id !== id);
      }
    });
  }
}
