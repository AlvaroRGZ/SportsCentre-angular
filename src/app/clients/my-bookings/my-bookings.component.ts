import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell, MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow, MatRowDef, MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {Installation} from "../../installations/installation.model";
import {Booking} from "../../installations/installation/booking-creation/bookingServices/booking.model";
import {InstallationService} from "../../installations/installation.service";
import {BookingsService} from "../../installations/installation/booking-creation/bookingServices/bookings.service";
import {forkJoin} from "rxjs";
import {FirebaseAuthService} from "../../authentication/firebase-auth.service";

@Component({
  selector: 'app-my-bookings',
  standalone: true,
  imports: [
    DatePipe,
    MatCell,
    MatCellDef,
    MatColumnDef,
    MatHeaderCell,
    MatHeaderRow,
    MatHeaderRowDef,
    MatIcon,
    MatIconButton,
    MatRow,
    MatRowDef,
    MatTable,
    NgForOf,
    NgIf,
    MatHeaderCellDef
  ],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent implements OnInit {
  installations: Installation[] = [];
  bookingsByInstallation: { [key: string]: Booking[] } = {};
  displayedColumns: string[] = ['date', 'materials', 'actions']; // Define column headers

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
          this.bookingsByInstallation[installations[index].id] = bookings;
        });
      });
    });
  }

  editBooking(bookingid: string): void {
    this.bookingService.updateBookingMaterials(bookingid, []).subscribe( (booking) => {
      console.log("I updated")
    });
  }

  deleteBooking(id: string): void {
    this.bookingService.deleteBooking(id).subscribe(() => {
      for (const installationId in this.bookingsByInstallation) {
        this.bookingsByInstallation[installationId] = this.bookingsByInstallation[installationId].filter(booking => booking.id !== id);
      }
    });
  }
}

