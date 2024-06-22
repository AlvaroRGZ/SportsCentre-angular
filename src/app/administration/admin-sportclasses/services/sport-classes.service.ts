import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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

  createSportClass(sportClass: SportClassCreation): Observable<SportClass> {
    return this.http.post<SportClass>(this.baseUrl, sportClass);
  }

  updateSportClass(id: string, sportClass: SportClass) {
    return this.http.put<SportClass>(`${this.baseUrl}/${id}`, sportClass);
  }

  deleteSportClass(id: string) {
    return this.http.delete<SportClass>(`${this.baseUrl}/${id}`);
  }
}
