import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddRemoteRoutingModule } from './add-remote-routing.module';
import { AddRemoteComponent } from './add-remote.component';


@NgModule({
  declarations: [AddRemoteComponent],
  imports: [
    CommonModule,
    AddRemoteRoutingModule
  ]
})
export class AddRemoteModule { }
