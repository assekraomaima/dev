import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LeaveRequestRoutingModule } from './leave-request-routing.module';
import { LeaveRequestComponent } from './leave-request.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [LeaveRequestComponent],
  imports: [
    CommonModule,
    LeaveRequestRoutingModule,
    NgxPaginationModule,
    NgbModule
  ]
})
export class LeaveRequestModule { }
