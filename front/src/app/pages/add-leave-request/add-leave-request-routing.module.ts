import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLeaveRequestComponent } from './add-leave-request.component';

const routes: Routes = [{
  path: '',
  component: AddLeaveRequestComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddLeaveRequestRoutingModule { }
