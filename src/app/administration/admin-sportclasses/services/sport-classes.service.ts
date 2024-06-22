import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {SportClass} from "./SportClass.model";
import {SportClassCreation} from "./sportclassCreation.model";

@Injectable({
  providedIn: 'root'
})
export class SportClassesService {
  private baseUrl = 'http://localhost:8080/sportclasses';

  constructor(private http: HttpClient) {}

  getSportClasses(): Observable<SportClass[]> {
    return this.http.get<SportClass[]>(this.baseUrl);
  }

  getSportClassById(id: string) {
    return this.http.get<SportClass>(`${this.baseUrl}/${id}`);
  }

  getUserSportClasses(email: string) {
    return this.http.get<SportClass[]>(`${this.baseUrl}/user/${email}`);
  }

  createSportClass(sportClass: SportClassCreation): Observable<SportClass> {
    return this.http.post<SportClass>(this.baseUrl, sportClass);
  }

  updateSportClass(id: string, sportClass: SportClass) {
    return this.http.put<SportClass>(`${this.baseUrl}/${id}`, sportClass);
  }

  applyForClass(id: string, email: string) {
    const params = new HttpParams().set('email', email);
    return this.http.put<SportClass>(`${this.baseUrl}/${id}/addAssistant`, null, { params: params });
  }

  removeFromClass(id: string, email: string) {
    const params = new HttpParams().set('email', email);
    return this.http.put<SportClass>(`${this.baseUrl}/${id}/removeAssistant`, null, { params: params });
  }

  deleteSportClass(id: string) {
    return this.http.delete<SportClass>(`${this.baseUrl}/${id}`);
  }
}
