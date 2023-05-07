import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ReservationCarsComponent } from "./reservation-cars.component";
import { ReservationCarsRoutingModule } from "./reservation-cars-routing.module";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [ReservationCarsComponent],
  imports: [CommonModule, ReservationCarsRoutingModule, ReactiveFormsModule],
})
export class AddCarModule {}
