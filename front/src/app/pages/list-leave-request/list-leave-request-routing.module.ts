import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListLeaveRequestComponent } from './list-leave-request.component';

const routes: Routes = [{
  path: '',
  component: ListLeaveRequestComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListLeaveRequestRoutingModule { }
