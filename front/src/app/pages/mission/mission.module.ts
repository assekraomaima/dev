import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MissionRoutingModule } from './mission-routing.module';
import { MissionComponent } from './mission.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [MissionComponent],
  imports: [
    CommonModule,
    MissionRoutingModule,
    NgbModule,
    NgxPaginationModule
  ]
})
export class MissionModule { }
