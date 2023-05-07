import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddReservationCarComponent } from '../add-reservation-car/add-reservation-car.component';

const routes: Routes = [{
  path: '',
  component: AddReservationCarComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddCarRoutingModule { }
