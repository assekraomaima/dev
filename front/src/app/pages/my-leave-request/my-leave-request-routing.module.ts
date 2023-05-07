import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyLeaveRequestComponent } from './my-leave-request.component';

const routes: Routes = [{
  path: '',
  component: MyLeaveRequestComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyLeaveRequestRoutingModule { }
