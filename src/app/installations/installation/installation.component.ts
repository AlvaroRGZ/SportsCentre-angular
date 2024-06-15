import {Component, OnInit} from '@angular/core';
import {NgIf} from "@angular/common";
import {Installation} from "../installation.model";
import {ActivatedRoute} from "@angular/router";
import {InstallationService} from "../installation.service";
import {ReservationTableComponent} from "./reservation-table/reservation-table.component";
import {BookingCreationComponent} from "./booking-creation/booking-creation.component";

@Component({
  selector: 'app-installation',
  standalone: true,
  imports: [
    NgIf,
    ReservationTableComponent,
    BookingCreationComponent
  ],
  templateUrl: './installation.component.html',
  styleUrl: './installation.component.css'
})
export class InstallationComponent implements OnInit {
  installation: Installation | undefined;
  protected showBookingForm: boolean = false;
  protected actionTitle: string[] = ['Book now', 'Cancel'];

  constructor(
    private route: ActivatedRoute,
    private installationService: InstallationService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.installationService.getInstallationById(id).subscribe((data: Installation) => {
        this.installation = data;
      });
    }
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
}
