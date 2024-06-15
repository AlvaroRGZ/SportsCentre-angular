import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Installation} from "./installation.model";

@Injectable({
  providedIn: 'root'
})
export class InstallationService {
  private apiUrl = 'http://localhost:8080/installations';

  constructor(private http: HttpClient) { }

  getInstallations(): Observable<Installation[]> {
    return this.http.get<Installation[]>(this.apiUrl);
  }

  getInstallationById(id: string): Observable<Installation> {
    return this.http.get<Installation>(`${this.apiUrl}/${id}`);
  }
}
