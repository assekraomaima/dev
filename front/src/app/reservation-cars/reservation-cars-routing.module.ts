import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReservationCarsComponent } from './reservation-cars.component';

const routes: Routes = [{
  path: '',
  component: ReservationCarsComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReservationCarsRoutingModule { }
