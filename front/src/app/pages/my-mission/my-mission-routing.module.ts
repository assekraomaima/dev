import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyMissionComponent } from './my-mission.component';

const routes: Routes = [{
  path: '',
  component: MyMissionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyMissionRoutingModule { }
