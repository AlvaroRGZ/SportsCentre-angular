import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MaterialsService} from "../../../materials/materials.service";
import {FormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import {Material} from "../../../materials/material.model";

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
  materials: any[] = [];
  selectedMaterials: Material[] = [];
  needMaterials: boolean = false;

  constructor(private materialService: MaterialsService) {
    this.selectedMaterials = [];
  }

  ngOnInit(): void {
    this.materialService.getMaterials().subscribe((data: any) => {
      this.materials = data;
    });
  }

  toggleNeedMaterials(): void {
    this.needMaterials = !this.needMaterials;
    if (!this.needMaterials) {
      this.selectedMaterials = [];
    }
  }

  addMaterial(event: any): void {
    const material = event.target.value;
    if (!this.selectedMaterials.includes(material)) {
      this.selectedMaterials.push(material);
    }
  }

  updateBooking(): void {
    // Logic to update booking
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
