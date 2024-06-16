import { Component, OnInit, ViewChild } from '@angular/core';
import { NgIf } from '@angular/common';
import { Installation } from '../installation.model';
import { ActivatedRoute, Router } from '@angular/router';
import { InstallationService } from '../installation.service';
import { ReservationTableComponent } from './reservation-table/reservation-table.component';
import { BookingCreationComponent } from './booking-creation/booking-creation.component';
import { Booking } from './booking-creation/bookingServices/booking.model';
import { FirebaseAuthService } from '../../authentication/firebase-auth.service';
import { BookingsService } from './booking-creation/bookingServices/bookings.service';

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [
    NgIf,
    ReservationTableComponent,
    BookingCreationComponent
  ],
  templateUrl: './installation.component.html',
  styleUrls: ['./installation.component.css']
})
export class InstallationComponent implements OnInit {
  @ViewChild(BookingCreationComponent) bookingCreation!: BookingCreationComponent;
  @ViewChild(ReservationTableComponent) reservationTable!: ReservationTableComponent;
  installation: Installation = {} as Installation;
  protected userEmail: string = '';
  protected showBookingForm: boolean = false;
  protected actionTitle: string[] = ['Book now', 'Cancel'];

  booking: Booking = {} as Booking;
  installationAction: string = 'Log in to book a session';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private installationService: InstallationService,
    private authService: FirebaseAuthService,
    private bookingsService: BookingsService
  ) { }

  ngOnInit(): void {
    // Initialize the booking object
    this.booking = {
      id: '',
      datetime: new Date(),
      registrationTime: new Date(),
      booker: this.userEmail,
      installation: '',
      materials: []
    };

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.installationService.getInstallationById(id).subscribe((data: Installation) => {
        this.installation = data;
        // Update booking installation ID after fetching installation details
        this.booking.installation = this.installation.id;
      });
    }

    this.authService.getCurrentUser().subscribe((user) => {
      if (user) {
        this.booking.booker = user.email || 'NotRegisteredUser';
        this.installationAction = 'Book now';
      }
      console.log(this.booking.booker);
    });
  }

  toggleBookingForm(): void {
    this.showBookingForm = !this.showBookingForm;
  }

  getBookingFormIndex(): number {
    return this.showBookingForm ? 1 : 0;
  }

  getActionTitle(): string {
    return this.actionTitle[this.getBookingFormIndex()];
  }

  handleCancelBooking(): void {
    this.showBookingForm = false;
  }

  handleConfirmBooking(): void {
    if (this.bookingCreation && this.reservationTable) {
      this.booking.materials = this.bookingCreation.selectedMaterials.map(material => material.id);
      this.booking.datetime = this.reservationTable.getReservationDate();
      console.log("ESTO ES LO QUE MANDO");
      console.log(this.booking);
      this.bookingsService.createBooking(this.booking).subscribe(
        response => {
          console.log('Booking created successfully', response);
          this.router.navigate(['home']);
        },
        error => {
          console.error('Error creating booking', error);
        }
      );
    }
  }
}
