import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Booking} from "./booking.model";
import {Material} from "../../../../materials/material.model";

@Injectable({
  providedIn: 'root'
})
export class BookingsService {
  private baseUrl = 'http://localhost:8080/bookings';

  constructor(private http: HttpClient) {
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}`);
  }

  getBookingById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.baseUrl}/${id}`);
  }

  getBookingsByInstallation(installationId: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/installation/${installationId}`);
  }

  getBookingsByBookerEmail(email: string): Observable<Booking[]> {
    return this.http.get<Booking[]>(`${this.baseUrl}/booker/${email}`);
  }

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.baseUrl, booking);
  }

  updateBookingMaterials(id: string, materials: Material[]): Observable<Booking> {
    console.log("LLAMO")
    return this.http.put<Booking>(`${this.baseUrl}/${id}/materials`, materials);
  }

  deleteBooking(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
