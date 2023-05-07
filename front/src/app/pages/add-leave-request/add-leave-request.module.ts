import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddLeaveRequestRoutingModule } from './add-leave-request-routing.module';
import { AddLeaveRequestComponent } from './add-leave-request.component';


@NgModule({
  declarations: [AddLeaveRequestComponent],
  imports: [
    CommonModule,
    AddLeaveRequestRoutingModule
  ]
})
export class AddLeaveRequestModule { }
