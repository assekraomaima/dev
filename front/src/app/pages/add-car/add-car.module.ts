import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AddCarRoutingModule } from "./add-car-routing.module";
import { AddCarComponent } from "./add-car.component";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  declarations: [AddCarComponent],
  imports: [CommonModule, AddCarRoutingModule, ReactiveFormsModule],
})
export class AddCarModule {}
