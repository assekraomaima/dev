import { Car } from "./Car";

export interface ReservationCars {
  CarId: number;
    id: number;
    StartDate:Date,
    endDate:Date,
    type:String,
    status:String,
  createdAt: string;
  updatedAt: string;
  Cars?: Car[];
}
