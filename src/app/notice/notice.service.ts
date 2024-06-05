import { Injectable } from '@angular/core';
import {Notice} from "./notice.model";
import {Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NoticeService {
  notices: Notice[] = [{ id: '1', title: 'hola', body: 'adios' }];

  private baseUrl = 'http://localhost:8080/notices';
  constructor(private http: HttpClient) { }

  getNotices(): Observable<Notice[]> {
    return this.http.get<Notice[]>(this.baseUrl);
    //return of(this.notices); // For testing purposes
  }
}
