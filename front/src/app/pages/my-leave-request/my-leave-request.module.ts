import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MyLeaveRequestRoutingModule } from './my-leave-request-routing.module';
import { MyLeaveRequestComponent } from './my-leave-request.component';


@NgModule({
  declarations: [MyLeaveRequestComponent],
  imports: [
    CommonModule,
    MyLeaveRequestRoutingModule
  ]
})
export class MyLeaveRequestModule { }
