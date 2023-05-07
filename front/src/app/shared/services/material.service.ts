import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {Material} from "../models/Material";

interface CreatematerialDto {
  name: string;
  
}

@Injectable({ providedIn: "root" })
export class Materialservice {
  backendUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}

  createMaterial(createMaterialDto: CreatematerialDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.backendUrl}/api/material`,
      createMaterialDto
    );
  }

  getMaterials(): Observable<Material[]> {
    return this.http.get<Material[]>(`${this.backendUrl}/api/material`);
  }

  getMaterialById(id: number): Observable<Material> {
    return this.http.get<Material>(`${this.backendUrl}/api/material/${id}`);
  }

  editMaterial(
    id: number,
    updateMaterialDto: CreatematerialDto
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${this.backendUrl}/api/material/${id}`,
      updateMaterialDto
    );
  }

  deleteMaterial(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.backendUrl}/api/material/${id}`
    );
  }
}
