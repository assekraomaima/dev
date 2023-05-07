import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { ReservationCars } from "../models/ReservationCars";

interface CreateReservationCarsDto {
    StartDate:Date,
    endDate:Date,
    type:String,
    status:String,
}

interface UpdateReservationCarsDto {
    StartDate:Date,
    endDate:Date,
    type:String,
    status:String,

}

@Injectable({ providedIn: "root" })
export class ReservationCarsService {
  private backendUrl = environment.backendUrl;
  constructor(private http: HttpClient) {}

  createReservationCars(createReservationCarsDto: CreateReservationCarsDto) {
    return this.http.post(`${this.backendUrl}/api/reservationcar`, createReservationCarsDto);
  }

  getReservationCars(): Observable<ReservationCars[]> {
    return this.http.get<ReservationCars[]>(`${this.backendUrl}/api/reservationcar`);
  }

  getReservationCarById(id: number): Observable<ReservationCars> {
    return this.http.get<ReservationCars>(`${this.backendUrl}/api/reservationcar/${id}`);
  }

  getMyReservationCar(): Observable<ReservationCars[]> {
    return this.http.get<ReservationCars[]>(`${this.backendUrl}/api/reservationcar/my-ReservationCar`);
  }

  editReservationCar(id: number, updateReservationCarsDto: UpdateReservationCarsDto) {
    return this.http.put(`${this.backendUrl}/api/reservationcar/${id}`, updateReservationCarsDto);
  }

  deleteReservationCar(id: number) {
    return this.http.delete(`${this.backendUrl}/api/reservationcar/${id}`);
  }
}
