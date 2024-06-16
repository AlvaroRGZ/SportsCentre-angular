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

  createMaterial(material: Material): Observable<Material> {
    return this.http.post<Material>(this.apiUrl, material);
  }

  updateMaterial(material: Material): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${material.id}`, material);
  }

  deleteMaterial(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  isMaterialNameAvailable(name: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/check-name?name=${name}`);
  }
}
