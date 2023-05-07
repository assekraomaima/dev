import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChangeRemoteRequestComponent } from './change-remote-request.component';

const routes: Routes = [{
  path: '',
  component: ChangeRemoteRequestComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeRemoteRequestRoutingModule { }
