import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Complaint} from "../clients/complaints/complaint.model";
import {UserAccount} from "../signup/userAccount.model";
import {User} from "./user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/users'; // Replace with your API URL

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  getUsersWhoHaveComplaints(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/complaints`);
  }

  getUserComplaints(email: string): Observable<Complaint[]> {
    return this.http.get<Complaint[]>(`${this.apiUrl}/${email}/complaints`);
  }

  addComplaint(userEmail: string, newComplaint: Complaint): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/${userEmail}/complaints`, newComplaint);
  }

  deleteComplaint(userEmail: string, complaintId: string): Observable<User> {
    return this.http.delete<User>(`${this.apiUrl}/${userEmail}/complaints/${complaintId}`);
  }
}
