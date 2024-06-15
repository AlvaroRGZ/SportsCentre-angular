import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MaterialsService} from "../../../materials/materials.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Material} from "../../../materials/material.model";
import {BookingsService} from "./bookingServices/bookings.service";
import {Booking} from "./bookingServices/booking.model";

@Component({
  selector: 'app-booking-creation',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf
  ],
  templateUrl: './booking-creation.component.html',
  styleUrl: './booking-creation.component.css'
})
export class BookingCreationComponent  implements OnInit {
  @Output() cancelBookingEvent = new EventEmitter<void>();
  @Output() confirmBookingEvent = new EventEmitter<void>();
  materials: Material[] = [];
  selectedMaterials: Material[] = [];
  needMaterials: boolean;

  constructor(private materialService: MaterialsService,
              private bookingsService: BookingsService) {
    this.selectedMaterials = [];
    this.needMaterials = false;
  }

  ngOnInit(): void {
    this.materialService.getMaterials().subscribe((data: Material[]) => {
      this.materials = data;
      console.log(this.materials);
    });
  }

  toggleNeedMaterials(): void {
    this.needMaterials = !this.needMaterials;
    if (!this.needMaterials) {
      this.selectedMaterials = [];
    }
  }

  addMaterial(event: any): void {
    const materialName = event.target.value;
    const material = this.materials.find(m => m.name === materialName);
    if (material && !this.selectedMaterials.includes(material)) {
      this.selectedMaterials.push(material);
      console.log("Added material:", material);
    }
  }

  confirmBooking(): void {
    // Logic to cancel booking
    // this.resetBooking();
    this.confirmBookingEvent.emit();
  }

  cancelBooking(): void {
    // Logic to cancel booking
    this.resetBooking();
    this.cancelBookingEvent.emit();
  }

  resetBooking(): void {
    this.selectedMaterials = [];
    this.materials = [];
    this.needMaterials = false;
  }
}
