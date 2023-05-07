import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMissionComponent } from './add-mission.component';

const routes: Routes = [{
  path: '',
  component: AddMissionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddMissionRoutingModule { }
