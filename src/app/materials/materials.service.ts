import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Material} from "./material.model";

@Injectable({
  providedIn: 'root'
})
export class MaterialsService {
  private apiUrl = 'http://localhost:8080/materials';

  constructor(private http: HttpClient) {}

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(this.apiUrl);
  }
}
