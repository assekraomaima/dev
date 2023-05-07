import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import {Car} from "../models/Car";

interface CreatecarDto {
  matricule:string;
  marque:string;
  
}

@Injectable({ providedIn: "root" })
export class Carservice {
 private backendUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}

  createCar(createCarDto: CreatecarDto): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.backendUrl}/api/car`,
      createCarDto
    );
  }

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`
    ${this.backendUrl}/api/car`);
  }

  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.backendUrl}/api/car/${id}`);
  }

  editCar(
    id: number,
    updateCarDto: CreatecarDto
  ): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${this.backendUrl}/api/car/${id}`,
      updateCarDto
    );
  }

  deleteCar(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(
      `${this.backendUrl}/api/car/${id}`
    );
  }
}
