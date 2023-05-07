import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListRemoteRoutingModule } from './list-remote-routing.module';
import { ListRemoteComponent } from './list-remote.component';


@NgModule({
  declarations: [ListRemoteComponent],
  imports: [
    CommonModule,
    ListRemoteRoutingModule
  ]
})
export class ListRemoteModule { }
