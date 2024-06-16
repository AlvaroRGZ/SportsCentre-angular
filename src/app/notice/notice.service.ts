import { Injectable } from '@angular/core';
import {Notice} from "./notice.model";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class NoticeService {

  private baseUrl = 'http://localhost:8080/notices';
  constructor(private http: HttpClient) { }

  getNotices(): Observable<Notice[]> {
    return this.http.get<Notice[]>(this.baseUrl);
  }

  createNotice(notice: Notice): Observable<Notice> {
    console.log("CREATE NOTICE")
    console.log(notice)
    return this.http.post<Notice>(this.baseUrl, notice);
  }

  updateNotice(notice: Notice): Observable<Notice> {
    console.log("UPDATE NOTICE")
    console.log(notice)
    return this.http.put<Notice>(`${this.baseUrl}/${notice.id}`, notice);
  }

  deleteNotice(id: String): Observable<Notice> {
    return this.http.delete<Notice>(`${this.baseUrl}/${id}`);
  }
}
