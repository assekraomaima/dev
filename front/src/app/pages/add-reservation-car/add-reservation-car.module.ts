import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddReservationCarRoutingModule } from "./add-reservation-car-routing.module";
import { AddReservationCarComponent } from "./add-reservation-car.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AddReservationCarComponent],
  imports: [CommonModule, AddReservationCarRoutingModule, ReactiveFormsModule],
})
export class AddCarModule {}
