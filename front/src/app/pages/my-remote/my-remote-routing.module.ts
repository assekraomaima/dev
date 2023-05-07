import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyRemoteComponent } from './my-remote.component';

const routes: Routes = [{
  path: '',
  component: MyRemoteComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyRemoteRoutingModule { }
