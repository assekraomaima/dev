import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListLeaveRequestRoutingModule } from './list-leave-request-routing.module';
import { ListLeaveRequestComponent } from './list-leave-request.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [ListLeaveRequestComponent],
  imports: [
    CommonModule,
    ListLeaveRequestRoutingModule,
    NgxPaginationModule
  ]
})
export class ListLeaveRequestModule { }
