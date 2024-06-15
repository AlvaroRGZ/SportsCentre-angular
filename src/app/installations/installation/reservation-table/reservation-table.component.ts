import {Component, Input} from '@angular/core';
import {Installation} from "../../installation.model";
import {Router} from "@angular/router";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {BookingCreationComponent} from "../booking-creation/booking-creation.component";

@Component({
  selector: 'app-reservation-table',
  standalone: true,
  imports: [
    NgForOf,
    NgClass,
    BookingCreationComponent,
    NgIf
  ],
  templateUrl: './reservation-table.component.html',
  styleUrl: './reservation-table.component.css'
})
export class ReservationTableComponent {
  @Input() installation: Installation | undefined;
  days: string[] = [];
  hours: string[] = ['15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  selectedDay: string | undefined;
  selectedHour: string | undefined;
  showBookingForm: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.generateNext5Weekdays();
  }

  generateNext5Weekdays(): void {
    const today = new Date();
    let count = 0;
    while (count < 5) {
      today.setDate(today.getDate() + 1);
      if (today.getDay() !== 0 && today.getDay() !== 6) {
        this.days.push(this.formatDate(today));
        count++;
      }
    }
  }

  formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    };
    return date.toLocaleDateString('en-US', options);
  }

  selectTime(day: string, hour: string): void {
    this.selectedDay = day;
    this.selectedHour = hour;
  }

  reserve(): void {
    if (this.selectedDay && this.selectedHour) {
      // @ts-ignore
      this.router.navigate(['/booking', this.installation.id, this.selectedDay, this.selectedHour]);
    } else {
      alert('Please select a day and time');
    }
  }
}
