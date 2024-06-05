import { Injectable } from '@angular/core';
import {Notice} from "./notice.model";
import {Observable, of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  notices: Notice[] = [{ id: '1', title: 'hola', body: 'adios' }];

  private baseUrl = 'http://localhost:8080/notices';
  constructor() { }

  getNotices(): Observable<Notice[]> {
    // Uncomment this line to fetch data from the server
    // return this.http.get<Notice[]>(this.baseUrl);
    return of(this.notices); // For testing purposes
  }
}
