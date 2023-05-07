import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChangeRemoteRequestRoutingModule } from './change-remote-request-routing.module';
import { ChangeRemoteRequestComponent } from './change-remote-request.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChangeRemoteRequestComponent],
  imports: [
    CommonModule,
    ChangeRemoteRequestRoutingModule,
    ReactiveFormsModule
  ]
})
export class ChangeRemoteRequestModule { }
