import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRemoteComponent } from './add-remote.component';

const routes: Routes = [{
  path: '',
  component: AddRemoteComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddRemoteRoutingModule { }
