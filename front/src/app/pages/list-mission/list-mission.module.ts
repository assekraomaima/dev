import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListMissionRoutingModule } from './list-mission-routing.module';
import { ListMissionComponent } from './list-mission.component';
import { NgxPaginationModule } from 'ngx-pagination';


@NgModule({
  declarations: [ListMissionComponent],
  imports: [
    CommonModule,
    ListMissionRoutingModule,
    NgxPaginationModule
  ]
})
export class ListMissionModule { }
